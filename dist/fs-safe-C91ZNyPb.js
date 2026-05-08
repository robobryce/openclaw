import "./fs-safe-defaults-CXEo8t9D.js";
import { i as isPathInside, o as isSymlinkOpenError, p as FsSafeError } from "./path-B_sJyaoq.js";
import { c as expandHomePrefix, o as root, t as resolveSecureTempRoot, u as resolveUserPath } from "./secure-temp-dir-D9QHcAGk.js";
import { t as sameFileIdentity } from "./file-identity-BoYbw9DH.js";
import { t as normalizeLowercaseStringOrEmpty } from "./string-coerce-DlH7RAUM.js";
import { n as registerTempPathForExit } from "./write-queue-DPi7hUhG.js";
import { r as sanitizeSafePathSegment } from "./safe-path-segment-CqRnHoDq.js";
import { a as inspectPathPermissions, c as isWorldReadable, l as isWorldWritable, o as isGroupReadable, s as isGroupWritable, u as modeBits } from "./permissions-cmaT_6ml.js";
import { URL, fileURLToPath } from "node:url";
import fs, { constants } from "node:fs";
import path from "node:path";
import fs$1, { mkdtemp, rm } from "node:fs/promises";
import "node:crypto";
//#region node_modules/@openclaw/fs-safe/dist/absolute-path.js
function assertAbsolutePathInput(filePath) {
	if (!filePath) throw new FsSafeError("invalid-path", "path is required");
	if (filePath.includes("\0")) throw new FsSafeError("invalid-path", "path must not contain NUL bytes");
	if (!path.isAbsolute(filePath)) throw new FsSafeError("invalid-path", "path must be absolute");
	return path.normalize(filePath);
}
async function pathExists$1(filePath) {
	try {
		await fs$1.access(filePath);
		return true;
	} catch {
		return false;
	}
}
async function findExistingAncestor(filePath) {
	return (await findExistingAncestorWithStat(filePath))?.path ?? null;
}
async function findExistingAncestorWithStat(filePath) {
	let current = path.resolve(filePath);
	while (true) {
		try {
			return {
				path: current,
				stat: await fs$1.lstat(current)
			};
		} catch (err) {
			if (err.code !== "ENOENT") throw err;
		}
		const parent = path.dirname(current);
		if (parent === current) return null;
		current = parent;
	}
}
async function canonicalPathFromExistingAncestor(filePath) {
	const ancestor = await findExistingAncestor(filePath);
	if (!ancestor) return path.resolve(filePath);
	let canonicalAncestor = ancestor;
	try {
		canonicalAncestor = await fs$1.realpath(ancestor);
	} catch {}
	const relative = path.relative(ancestor, filePath);
	return relative ? path.join(canonicalAncestor, relative) : canonicalAncestor;
}
async function resolveAbsolutePathForRead(filePath, options = {}) {
	const normalized = assertAbsolutePathInput(filePath);
	let canonicalPath;
	try {
		canonicalPath = await fs$1.realpath(normalized);
	} catch (err) {
		if (err.code === "ENOENT") throw new FsSafeError("not-found", "path not found", { cause: err });
		throw err;
	}
	if ((options.symlinks ?? "reject") === "reject" && canonicalPath !== normalized) throw new FsSafeError("symlink", "path traverses a symlink", { cause: { canonicalPath } });
	return {
		path: normalized,
		canonicalPath
	};
}
async function resolveAbsolutePathForWrite(filePath, options = {}) {
	const normalized = assertAbsolutePathInput(filePath);
	const parentDir = path.dirname(normalized);
	const parentExists = await pathExists$1(parentDir);
	if ((options.symlinks ?? "reject") === "reject") {
		const ancestor = await findExistingAncestor(parentDir);
		if (ancestor) {
			const canonicalAncestor = await fs$1.realpath(ancestor).catch(() => ancestor);
			if (canonicalAncestor !== ancestor) throw new FsSafeError("symlink", "path traverses a symlink", { cause: { canonicalPath: path.join(canonicalAncestor, path.relative(ancestor, normalized)) } });
		}
	}
	return {
		path: normalized,
		canonicalPath: await canonicalPathFromExistingAncestor(normalized),
		parentDir,
		parentExists
	};
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/filename.js
function sanitizeUntrustedFileName(fileName, fallbackName) {
	const trimmed = typeof fileName === "string" ? fileName.trim() : "";
	if (!trimmed) return fallbackName;
	let base = path.posix.basename(trimmed);
	base = path.win32.basename(base);
	let cleaned = "";
	for (let i = 0; i < base.length; i++) {
		const code = base.charCodeAt(i);
		if (code < 32 || code === 127) continue;
		cleaned += base[i];
	}
	base = cleaned.trim();
	if (!base || base === "." || base === "..") return fallbackName;
	if (base.length > 200) base = base.slice(0, 200);
	return base;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/fs.js
/**
* Returns true when `fs.stat()` can stat the path.
*
* This follows stat semantics: broken symlinks return false, while symlinks to
* existing targets return true.
*/
async function pathExists(filePath) {
	try {
		await fs$1.stat(filePath);
		return true;
	} catch {
		return false;
	}
}
/**
* Synchronous counterpart to `pathExists()`, with the same `fs.statSync()`
* semantics.
*/
function pathExistsSync(filePath) {
	try {
		fs.statSync(filePath);
		return true;
	} catch {
		return false;
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/local-file-access.js
const ENCODED_FILE_URL_SEPARATOR_RE = /%(?:2f|5c)/i;
function isLocalFileUrlHost(hostname) {
	const normalized = normalizeLowercaseStringOrEmpty(hostname);
	return normalized === "" || normalized === "localhost";
}
function hasEncodedFileUrlSeparator(pathname) {
	return ENCODED_FILE_URL_SEPARATOR_RE.test(pathname);
}
function isWindowsNetworkPath(filePath, platform = process.platform) {
	if (platform !== "win32") return false;
	const normalized = filePath.replace(/\//g, "\\");
	return normalized.startsWith("\\\\?\\UNC\\") || normalized.startsWith("\\\\");
}
function isWindowsDriveLetterPath(filePath, platform = process.platform) {
	return platform === "win32" && /^[A-Za-z]:[\\/]/.test(filePath);
}
function assertNoWindowsNetworkPath(filePath, label = "Path") {
	if (isWindowsNetworkPath(filePath)) throw new Error(`${label} cannot use Windows network paths: ${filePath}`);
}
function safeFileURLToPath(fileUrl) {
	let parsed;
	try {
		parsed = new URL(fileUrl);
	} catch {
		throw new Error(`Invalid file:// URL: ${fileUrl}`);
	}
	if (parsed.protocol !== "file:") throw new Error(`Invalid file:// URL: ${fileUrl}`);
	if (!isLocalFileUrlHost(parsed.hostname)) throw new Error(`file:// URLs with remote hosts are not allowed: ${fileUrl}`);
	if (hasEncodedFileUrlSeparator(parsed.pathname)) throw new Error(`file:// URLs cannot encode path separators: ${fileUrl}`);
	const filePath = fileURLToPath(parsed);
	assertNoWindowsNetworkPath(filePath, "Local file URL");
	return filePath;
}
function trySafeFileURLToPath(fileUrl) {
	try {
		return safeFileURLToPath(fileUrl);
	} catch {
		return;
	}
}
function basenameFromMediaSource(source) {
	if (!source) return;
	if (source.startsWith("file://")) {
		const filePath = trySafeFileURLToPath(source);
		return filePath ? path.basename(filePath) || void 0 : void 0;
	}
	if (/^https?:\/\//i.test(source)) try {
		return path.basename(new URL(source).pathname) || void 0;
	} catch {
		return;
	}
	return path.basename(source) || void 0;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/local-roots.js
function resolveLocalPathInput(input, label) {
	if (input.startsWith("file://")) try {
		return safeFileURLToPath(input);
	} catch {
		const location = label === "file path" ? "" : ` in ${label}`;
		throw new Error(`Invalid file:// URL${location}: ${input}`);
	}
	if (input.includes("\0")) throw new FsSafeError("invalid-path", `${label} must not contain NUL bytes`);
	return resolveUserPath(input);
}
function resolveLocalRootInput(input, label) {
	const trimmed = input.trim();
	if (!trimmed) throw new FsSafeError("invalid-path", `${label} entry is required`);
	const resolved = trimmed.startsWith("file://") ? resolveLocalPathInput(trimmed, label) : expandHomePrefix(trimmed);
	if (resolved.includes("\0")) throw new FsSafeError("invalid-path", `${label} entry must not contain NUL bytes`);
	if (!path.isAbsolute(resolved)) throw new FsSafeError("invalid-path", `${label} entries must be absolute paths: ${input}`);
	return path.resolve(resolved);
}
function isPathInsideRoot(candidate, rootDir) {
	return isPathInside(rootDir, candidate);
}
function resolveRootRealSync(rootDir) {
	try {
		if (!fs.lstatSync(rootDir).isDirectory()) return null;
		return fs.realpathSync(rootDir);
	} catch {
		return null;
	}
}
function resolveCandidateCanonicalSync(filePath) {
	let sawExistingLeaf = false;
	try {
		const stat = fs.lstatSync(filePath);
		sawExistingLeaf = true;
		return {
			exists: true,
			canonicalPath: fs.realpathSync(filePath),
			isFile: stat.isFile()
		};
	} catch (err) {
		if (err.code !== "ENOENT") throw err;
	}
	if (sawExistingLeaf) throw new FsSafeError("symlink", "local roots candidate is a dangling symlink");
	let cursor = filePath;
	const missingSegments = [];
	while (true) {
		const parent = path.dirname(cursor);
		if (parent === cursor) return {
			exists: false,
			canonicalPath: filePath
		};
		missingSegments.unshift(path.basename(cursor));
		cursor = parent;
		try {
			fs.lstatSync(cursor);
			const ancestorReal = fs.realpathSync(cursor);
			return {
				exists: false,
				canonicalPath: path.join(ancestorReal, ...missingSegments)
			};
		} catch (err) {
			if (err.code !== "ENOENT") throw err;
		}
	}
}
function resolveLocalPathFromRootsSync(options) {
	const label = options.label ?? "local roots";
	const requestedPath = path.resolve(resolveLocalPathInput(options.filePath, "file path"));
	for (const rootEntry of options.roots) {
		const rootReal = resolveRootRealSync(resolveLocalRootInput(rootEntry, label));
		if (!rootReal) continue;
		let candidate;
		try {
			candidate = resolveCandidateCanonicalSync(requestedPath);
		} catch {
			continue;
		}
		if (!candidate.exists && options.allowMissing !== true) continue;
		if (candidate.exists && options.requireFile === true && !candidate.isFile) continue;
		if (isPathInsideRoot(candidate.canonicalPath, rootReal)) return {
			path: candidate.canonicalPath,
			root: rootReal
		};
	}
	return null;
}
async function readLocalFileFromRoots(options) {
	const label = options.label ?? "local roots";
	const requestedPath = path.resolve(resolveLocalPathInput(options.filePath, "file path"));
	for (const rootEntry of options.roots) {
		const rootDir = resolveLocalRootInput(rootEntry, label);
		let scopedRoot;
		try {
			scopedRoot = await root(rootDir);
		} catch {
			continue;
		}
		const relativePath = path.relative(scopedRoot.rootDir, requestedPath);
		if (!relativePath || relativePath.startsWith("..") || path.isAbsolute(relativePath)) continue;
		try {
			const readOptions = {
				hardlinks: options.hardlinks,
				nonBlockingRead: options.nonBlockingRead,
				symlinks: options.symlinks
			};
			if (options.maxBytes !== void 0) readOptions.maxBytes = options.maxBytes;
			return {
				...await scopedRoot.read(relativePath, readOptions),
				root: scopedRoot.rootReal
			};
		} catch {
			continue;
		}
	}
	return null;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/timing.js
async function withTimeout(promise, timeoutMs, labelOrOptions = { message: "timeout" }) {
	if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return await promise;
	const options = typeof labelOrOptions === "string" ? { label: labelOrOptions } : labelOrOptions;
	const createError = options.createError ?? (() => new Error(options.message ?? `${options.label ?? "operation"} timed out after ${timeoutMs}ms`));
	let timeoutId;
	try {
		return await Promise.race([promise, new Promise((_, reject) => {
			timeoutId = setTimeout(() => reject(createError()), timeoutMs);
		})]);
	} finally {
		if (timeoutId) clearTimeout(timeoutId);
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/temp-target.js
function sanitizePrefix(prefix) {
	return prefix.replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "tmp";
}
function sanitizeTempFileName(fileName) {
	return sanitizeSafePathSegment(path.basename(fileName), "download.bin", { allowDotPrefix: true });
}
function isNodeErrorWithCode(err, code) {
	return typeof err === "object" && err !== null && "code" in err && err.code === code;
}
async function cleanupTempDir(dir, onCleanupError) {
	try {
		await rm(dir, {
			recursive: true,
			force: true
		});
	} catch (err) {
		if (!isNodeErrorWithCode(err, "ENOENT")) onCleanupError?.(err);
	}
}
function resolveTempRoot(rootDir) {
	return rootDir ?? resolveSecureTempRoot({ fallbackPrefix: "fs-safe" });
}
async function tempFile(params) {
	const rootDir = resolveTempRoot(params.rootDir);
	const prefix = `${sanitizePrefix(params.prefix)}-`;
	const dir = await mkdtemp(path.join(rootDir, prefix));
	const unregisterTempDir = registerTempPathForExit(dir, { recursive: true });
	const file = (fileName) => path.join(dir, sanitizeTempFileName(fileName ?? params.fileName ?? "download.bin"));
	const cleanup = async () => {
		try {
			await cleanupTempDir(dir, params.onCleanupError);
		} finally {
			unregisterTempDir();
		}
	};
	return {
		dir,
		path: file(),
		file,
		cleanup,
		[Symbol.asyncDispose]: cleanup
	};
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/secure-file.js
const SUPPORTS_NOFOLLOW = process.platform !== "win32" && "O_NOFOLLOW" in constants;
const OPEN_READ_FLAGS = constants.O_RDONLY | (SUPPORTS_NOFOLLOW ? constants.O_NOFOLLOW : 0);
function isAbsolutePathname(value) {
	return path.isAbsolute(value) || isWindowsDriveLetterPath(value, "win32") || isWindowsNetworkPath(value, "win32");
}
function label(options) {
	return options.label ?? "Secure file";
}
async function openSecureHandle(options) {
	if (isWindowsNetworkPath(options.filePath, "win32") && !options.trust?.allowNetworkPath) throw new FsSafeError("invalid-path", `${label(options)} must be a local absolute path.`);
	if (!isAbsolutePathname(options.filePath)) throw new FsSafeError("invalid-path", `${label(options)} must be an absolute path.`);
	const preStat = await fs$1.lstat(options.filePath).catch((err) => {
		throw new FsSafeError("not-found", `${label(options)} is not readable: ${options.filePath}`, { cause: err });
	});
	if (preStat.isDirectory()) throw new FsSafeError("not-file", `${label(options)} must be a file: ${options.filePath}`);
	if (preStat.isSymbolicLink() && !options.trust?.allowSymlink) throw new FsSafeError("symlink", `${label(options)} must not be a symlink: ${options.filePath}`);
	let handle;
	try {
		handle = await fs$1.open(options.filePath, options.trust?.allowSymlink ? constants.O_RDONLY : OPEN_READ_FLAGS);
	} catch (err) {
		if (isSymlinkOpenError(err)) throw new FsSafeError("symlink", `${label(options)} symlink open blocked`, { cause: err });
		throw err;
	}
	try {
		const openedStat = await handle.stat();
		if (!openedStat.isFile()) throw new FsSafeError("not-file", `${label(options)} must be a file: ${options.filePath}`);
		const pathStat = options.trust?.allowSymlink ? await fs$1.stat(options.filePath) : await fs$1.lstat(options.filePath);
		if (!options.trust?.allowSymlink && pathStat.isSymbolicLink()) throw new FsSafeError("symlink", `${label(options)} must not be a symlink: ${options.filePath}`);
		if (!sameFileIdentity(pathStat, openedStat)) throw new FsSafeError("path-mismatch", `${label(options)} changed during open.`);
		const realPath = await fs$1.realpath(options.filePath);
		if (!sameFileIdentity(await fs$1.stat(realPath), openedStat)) throw new FsSafeError("path-mismatch", `${label(options)} real path changed during open.`);
		if (options.io?.maxBytes !== void 0 && openedStat.size > options.io.maxBytes) throw new FsSafeError("too-large", `${label(options)} exceeded maxBytes (${options.io.maxBytes}).`);
		return {
			handle,
			pathStat: openedStat,
			realPath
		};
	} catch (err) {
		await handle.close().catch(() => void 0);
		throw err;
	}
}
async function assertTrustedDirs(options, realPath) {
	if (!options.trust?.trustedDirs || options.trust.trustedDirs.length === 0) return;
	if (!(await Promise.all(options.trust.trustedDirs.map(async (dir) => {
		const resolved = path.resolve(dir);
		return await fs$1.realpath(resolved).catch(() => resolved);
	}))).some((dir) => isPathInside(dir, realPath))) throw new FsSafeError("outside-workspace", `${label(options)} is outside trustedDirs: ${realPath}`);
}
function inspectOpenedPermissions(stat, platform) {
	const bits = modeBits(typeof stat.mode === "number" ? stat.mode : null);
	return {
		ok: true,
		isSymlink: false,
		isDir: stat.isDirectory(),
		mode: typeof stat.mode === "number" ? stat.mode : null,
		bits,
		source: platform === "win32" ? "unknown" : "posix",
		worldWritable: isWorldWritable(bits),
		groupWritable: isGroupWritable(bits),
		worldReadable: isWorldReadable(bits),
		groupReadable: isGroupReadable(bits)
	};
}
async function assertSecurePermissions(options, stat, realPath) {
	if (options.permissions?.allowInsecure) return;
	const platform = options.inject?.platform ?? process.platform;
	const permissions = platform === "win32" ? await inspectPathPermissions(realPath, options.inject) : inspectOpenedPermissions(stat, platform);
	if (!permissions.ok) throw new FsSafeError("permission-unverified", `${label(options)} permissions could not be verified: ${realPath}`);
	if (platform === "win32" && permissions.source === "unknown") throw new FsSafeError("permission-unverified", `${label(options)} ACL verification unavailable on Windows for ${realPath}.`);
	const writableByOthers = permissions.worldWritable || permissions.groupWritable;
	const readableByOthers = permissions.worldReadable || permissions.groupReadable;
	if (writableByOthers || !options.permissions?.allowReadableByOthers && readableByOthers) throw new FsSafeError("insecure-permissions", `${label(options)} permissions are too open: ${realPath}`);
	if (platform !== "win32" && typeof process.getuid === "function" && stat.uid != null) {
		const uid = process.getuid();
		if (stat.uid !== uid) throw new FsSafeError("not-owned", `${label(options)} must be owned by the current user (uid=${uid}): ${realPath}`);
	}
	return permissions;
}
async function readHandleWithTimeout(handle, timeoutMs) {
	if (timeoutMs === void 0 || !Number.isFinite(timeoutMs) || timeoutMs <= 0) return await handle.readFile();
	let timeout;
	try {
		return await Promise.race([handle.readFile(), new Promise((_resolve, reject) => {
			timeout = setTimeout(() => {
				handle.close().catch(() => void 0);
				reject(new FsSafeError("timeout", `secure file read timed out after ${timeoutMs}ms`));
			}, timeoutMs);
		})]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
async function readSecureFile(options) {
	const opened = await openSecureHandle(options);
	try {
		await assertTrustedDirs(options, opened.realPath);
		const permissions = await assertSecurePermissions(options, opened.pathStat, opened.realPath);
		const buffer = await readHandleWithTimeout(opened.handle, options.io?.timeoutMs);
		if (options.io?.maxBytes !== void 0 && buffer.byteLength > options.io.maxBytes) throw new FsSafeError("too-large", `${label(options)} exceeded maxBytes (${options.io.maxBytes}).`);
		return {
			buffer,
			realPath: opened.realPath,
			stat: opened.pathStat,
			permissions
		};
	} finally {
		await opened.handle.close().catch(() => void 0);
	}
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/walk.js
function kindForDirent(dirent) {
	if (dirent.isDirectory()) return "directory";
	if (dirent.isFile()) return "file";
	if (dirent.isSymbolicLink()) return "symlink";
	return "other";
}
function shouldStop(result, options) {
	return options.maxEntries !== void 0 && result.scannedEntryCount >= Math.max(0, options.maxEntries);
}
function buildEntry(params) {
	const fullPath = path.join(params.dir, params.dirent.name);
	const relativePath = path.relative(params.rootDir, fullPath) || params.dirent.name;
	return {
		name: params.dirent.name,
		path: fullPath,
		relativePath,
		depth: params.depth,
		kind: params.kind ?? kindForDirent(params.dirent),
		dirent: params.dirent
	};
}
function resolveSyncKind(fullPath, dirent, symlinks) {
	const kind = kindForDirent(dirent);
	if (kind !== "symlink") return kind;
	if (symlinks === "skip") return null;
	if (symlinks === "include") return "symlink";
	try {
		const stat = fs.statSync(fullPath);
		if (stat.isDirectory()) return "directory";
		if (stat.isFile()) return "file";
	} catch {
		return null;
	}
	return "other";
}
async function resolveAsyncKind(fullPath, dirent, symlinks) {
	const kind = kindForDirent(dirent);
	if (kind !== "symlink") return kind;
	if (symlinks === "skip") return null;
	if (symlinks === "include") return "symlink";
	try {
		const stat = await fs$1.stat(fullPath);
		if (stat.isDirectory()) return "directory";
		if (stat.isFile()) return "file";
	} catch {
		return null;
	}
	return "other";
}
function walkDirectorySync(rootDir, options = {}) {
	const root = path.resolve(rootDir);
	const symlinks = options.symlinks ?? "skip";
	const result = {
		entries: [],
		scannedEntryCount: 0,
		truncated: false
	};
	const visitedDirs = /* @__PURE__ */ new Set();
	function visit(dir, depth) {
		if (options.maxDepth !== void 0 && depth > options.maxDepth) return;
		let realDir;
		try {
			realDir = fs.realpathSync(dir);
		} catch {
			return;
		}
		if (visitedDirs.has(realDir)) return;
		visitedDirs.add(realDir);
		let entries;
		try {
			entries = fs.readdirSync(dir, { withFileTypes: true });
		} catch {
			return;
		}
		for (const dirent of entries) {
			if (shouldStop(result, options)) {
				result.truncated = true;
				return;
			}
			result.scannedEntryCount += 1;
			const fullPath = path.join(dir, dirent.name);
			const kind = resolveSyncKind(fullPath, dirent, symlinks);
			if (!kind) continue;
			const entry = buildEntry({
				rootDir: root,
				dir,
				dirent,
				depth,
				kind
			});
			if (options.include?.(entry) ?? true) result.entries.push(entry);
			if (kind === "directory" && (options.maxDepth === void 0 || depth < options.maxDepth) && (options.descend?.(entry) ?? true)) {
				visit(fullPath, depth + 1);
				if (result.truncated) return;
			}
		}
	}
	visit(root, 1);
	return result;
}
async function walkDirectory(rootDir, options = {}) {
	const root = path.resolve(rootDir);
	const symlinks = options.symlinks ?? "skip";
	const result = {
		entries: [],
		scannedEntryCount: 0,
		truncated: false
	};
	const visitedDirs = /* @__PURE__ */ new Set();
	async function visit(dir, depth) {
		if (options.maxDepth !== void 0 && depth > options.maxDepth) return;
		let realDir;
		try {
			realDir = await fs$1.realpath(dir);
		} catch {
			return;
		}
		if (visitedDirs.has(realDir)) return;
		visitedDirs.add(realDir);
		let entries;
		try {
			entries = await fs$1.readdir(dir, { withFileTypes: true });
		} catch {
			return;
		}
		for (const dirent of entries) {
			if (shouldStop(result, options)) {
				result.truncated = true;
				return;
			}
			result.scannedEntryCount += 1;
			const fullPath = path.join(dir, dirent.name);
			const kind = await resolveAsyncKind(fullPath, dirent, symlinks);
			if (!kind) continue;
			const entry = buildEntry({
				rootDir: root,
				dir,
				dirent,
				depth,
				kind
			});
			if (options.include?.(entry) ?? true) result.entries.push(entry);
			if (kind === "directory" && (options.maxDepth === void 0 || depth < options.maxDepth) && (options.descend?.(entry) ?? true)) {
				await visit(fullPath, depth + 1);
				if (result.truncated) return;
			}
		}
	}
	await visit(root, 1);
	return result;
}
//#endregion
//#region node_modules/@openclaw/fs-safe/dist/output.js
function tempFileNameForTarget(targetPath) {
	return sanitizeUntrustedFileName(path.basename(targetPath), "output.bin");
}
function ensureTrailingSep(value) {
	return value.endsWith(path.sep) ? value : `${value}${path.sep}`;
}
function toRootPathInput(params) {
	if (!path.isAbsolute(params.targetPath)) return params.targetPath;
	const absoluteTarget = path.resolve(params.targetPath);
	const rootDir = path.resolve(params.rootDir);
	if (isPathInside(ensureTrailingSep(rootDir), absoluteTarget)) return path.relative(rootDir, absoluteTarget);
	if (isPathInside(ensureTrailingSep(params.rootReal), absoluteTarget)) return path.relative(params.rootReal, absoluteTarget);
	return params.targetPath;
}
function assertFileTargetPath(targetPath) {
	const basename = path.basename(targetPath);
	if (!targetPath || targetPath === "." || targetPath.endsWith("/") || targetPath.endsWith("\\") || !basename || basename === "." || basename === "..") throw new FsSafeError("invalid-path", "target path must name a file");
}
async function writeExternalFileWithinRoot(options) {
	const targetRoot = await root(options.rootDir);
	const requestedTargetPath = options.path;
	if (requestedTargetPath.length === 0) throw new FsSafeError("invalid-path", "target path is required");
	const targetPath = toRootPathInput({
		rootDir: targetRoot.rootDir,
		rootReal: targetRoot.rootReal,
		targetPath: requestedTargetPath
	});
	assertFileTargetPath(targetPath);
	const finalPath = await targetRoot.resolve(targetPath);
	const staged = await tempFile({
		prefix: "fs-safe-output",
		fileName: tempFileNameForTarget(targetPath)
	});
	try {
		const result = await options.write(staged.path);
		await targetRoot.copyIn(targetPath, staged.path, {
			maxBytes: options.maxBytes,
			mode: options.mode,
			mkdir: true,
			sourceHardlinks: "reject"
		});
		return {
			path: finalPath,
			result
		};
	} finally {
		await staged.cleanup();
	}
}
//#endregion
//#region src/infra/fs-safe.ts
/** @deprecated Use root(rootDir).read(relativePath, options). */
async function readFileWithinRoot(params) {
	return await (await root(params.rootDir)).read(params.relativePath, {
		hardlinks: params.rejectHardlinks === false ? "allow" : "reject",
		maxBytes: params.maxBytes,
		nonBlockingRead: params.nonBlockingRead,
		symlinks: params.allowSymlinkTargetWithinRoot === true ? "follow-within-root" : "reject"
	});
}
/** @deprecated Use root(rootDir).write(relativePath, data, options). */
async function writeFileWithinRoot(params) {
	await (await root(params.rootDir)).write(params.relativePath, params.data, {
		encoding: params.encoding,
		mkdir: params.mkdir
	});
}
//#endregion
export { resolveAbsolutePathForWrite as C, resolveAbsolutePathForRead as S, pathExistsSync as _, walkDirectorySync as a, canonicalPathFromExistingAncestor as b, readLocalFileFromRoots as c, basenameFromMediaSource as d, hasEncodedFileUrlSeparator as f, pathExists as g, trySafeFileURLToPath as h, walkDirectory as i, resolveLocalPathFromRootsSync as l, safeFileURLToPath as m, writeFileWithinRoot as n, readSecureFile as o, isWindowsNetworkPath as p, writeExternalFileWithinRoot as r, withTimeout as s, readFileWithinRoot as t, assertNoWindowsNetworkPath as u, sanitizeUntrustedFileName as v, findExistingAncestor as x, assertAbsolutePathInput as y };
