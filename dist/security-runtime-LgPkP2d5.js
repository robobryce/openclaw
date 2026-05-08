import "./redact-giw01WLO.js";
import "./errors-SdKPttvI.js";
import "./fs-safe-defaults-CXEo8t9D.js";
import { i as isPathInside, p as FsSafeError, r as isNotFoundPathError } from "./path-B_sJyaoq.js";
import { o as root } from "./secure-temp-dir-D9QHcAGk.js";
import "./fs-safe-C91ZNyPb.js";
import "./path-guards-CWjZtYZj.js";
import "./replace-file-Nprm-pSK.js";
import "./fs-safe-advanced-D6eG2Aea.js";
import "./private-file-store-B5mHCqlS.js";
import "./shared-Cy5tI393.js";
import "./ports-CfV7gDCr.js";
import "./ssrf-C-oxBlw8.js";
import "./sibling-temp-file-BiHNl6Vi.js";
import "./runtime-shared-Bvty5Fzu.js";
import { i as wrapExternalContent } from "./external-content-C_GAT9Wg.js";
import "./dm-policy-shared-B4V1HH_w.js";
import "./channel-secret-collector-runtime-CgkPRULU.js";
import path from "node:path";
import fs from "node:fs/promises";
//#region node_modules/@openclaw/fs-safe/dist/root-paths.js
function invalidPath(scopeLabel) {
	return {
		ok: false,
		error: `Invalid path: must stay within ${scopeLabel}`
	};
}
async function resolveRealPathIfExists(targetPath) {
	try {
		return await fs.realpath(targetPath);
	} catch {
		return;
	}
}
async function resolveTrustedRootRealPath(rootDir) {
	try {
		const rootLstat = await fs.lstat(rootDir);
		if (!rootLstat.isDirectory() || rootLstat.isSymbolicLink()) return;
		return await fs.realpath(rootDir);
	} catch {
		return;
	}
}
async function validateCanonicalPathWithinRoot(params) {
	try {
		const candidateLstat = await fs.lstat(params.candidatePath);
		if (candidateLstat.isSymbolicLink()) return "invalid";
		if (params.expect === "directory" && !candidateLstat.isDirectory()) return "invalid";
		if (params.expect === "file" && !candidateLstat.isFile()) return "invalid";
		if (params.expect === "file" && candidateLstat.nlink > 1) return "invalid";
		const candidateRealPath = await fs.realpath(params.candidatePath);
		return isPathInside(params.rootRealPath, candidateRealPath) ? "ok" : "invalid";
	} catch (err) {
		return isNotFoundPathError(err) ? "not-found" : "invalid";
	}
}
function resolvePathWithinRoot(params) {
	const root = path.resolve(params.rootDir);
	const raw = params.requestedPath.trim();
	if (!raw) {
		if (!params.defaultFileName) return {
			ok: false,
			error: "path is required"
		};
		return {
			ok: true,
			path: path.join(root, params.defaultFileName)
		};
	}
	const resolved = path.resolve(root, raw);
	const rel = path.relative(root, resolved);
	if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return {
		ok: false,
		error: `Invalid path: must stay within ${params.scopeLabel}`
	};
	return {
		ok: true,
		path: resolved
	};
}
async function resolveWritablePathWithinRoot(params) {
	const lexical = resolvePathWithinRoot(params);
	if (!lexical.ok) return lexical;
	const rootRealPath = await resolveTrustedRootRealPath(path.resolve(params.rootDir));
	if (!rootRealPath) return invalidPath(params.scopeLabel);
	const requestedPath = lexical.path;
	if (await validateCanonicalPathWithinRoot({
		rootRealPath,
		candidatePath: path.dirname(requestedPath),
		expect: "directory"
	}) !== "ok") return invalidPath(params.scopeLabel);
	if (await validateCanonicalPathWithinRoot({
		rootRealPath,
		candidatePath: requestedPath,
		expect: "file"
	}) === "invalid") return invalidPath(params.scopeLabel);
	return lexical;
}
async function resolveNearestExistingPath(targetPath) {
	let current = path.resolve(targetPath);
	while (true) {
		try {
			await fs.lstat(current);
			return current;
		} catch (err) {
			if (!isNotFoundPathError(err)) throw err;
		}
		const parent = path.dirname(current);
		if (parent === current) throw new Error(`failed to resolve existing path for ${targetPath}`);
		current = parent;
	}
}
async function assertNoSymlinkSegments(params) {
	const relative = path.relative(params.rootDir, params.targetPath);
	if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error(`Invalid path: must stay within ${params.scopeLabel}`);
	let current = params.rootDir;
	for (const segment of relative.split(path.sep).filter(Boolean)) {
		current = path.join(current, segment);
		try {
			const stat = await fs.lstat(current);
			if (stat.isSymbolicLink()) throw new Error(`Invalid path: must not traverse symlinks within ${params.scopeLabel}`);
			if (!stat.isDirectory()) throw new Error(`Invalid path: existing segment must be a directory within ${params.scopeLabel}`);
		} catch (err) {
			if (isNotFoundPathError(err)) return;
			throw err;
		}
	}
}
async function ensureDirectoryWithinRoot(params) {
	const lexical = resolvePathWithinRoot({
		rootDir: params.rootDir,
		requestedPath: params.requestedPath,
		scopeLabel: params.scopeLabel,
		defaultFileName: params.defaultDirName
	});
	if (!lexical.ok) return lexical;
	const rootDir = path.resolve(params.rootDir);
	const targetPath = path.resolve(lexical.path);
	try {
		const rootStat = await fs.lstat(rootDir);
		if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) return invalidPath(params.scopeLabel);
		await assertNoSymlinkSegments({
			rootDir,
			targetPath,
			scopeLabel: params.scopeLabel
		});
		const rootReal = await fs.realpath(rootDir);
		const nearestExistingPath = await resolveNearestExistingPath(targetPath);
		if (!isPathInside(rootReal, await fs.realpath(nearestExistingPath))) return invalidPath(params.scopeLabel);
		const relative = path.relative(rootDir, targetPath);
		let current = rootDir;
		for (const segment of relative.split(path.sep).filter(Boolean)) {
			current = path.join(current, segment);
			while (true) try {
				const stat = await fs.lstat(current);
				if (stat.isSymbolicLink() || !stat.isDirectory()) return invalidPath(params.scopeLabel);
				break;
			} catch (err) {
				if (!isNotFoundPathError(err)) throw err;
				try {
					await fs.mkdir(current, { mode: params.mode });
				} catch (mkdirErr) {
					if (isNotFoundPathError(mkdirErr)) throw mkdirErr;
					if (mkdirErr.code === "EEXIST") continue;
					throw mkdirErr;
				}
			}
		}
		if (!isPathInside(rootReal, await fs.realpath(targetPath))) return invalidPath(params.scopeLabel);
		return {
			ok: true,
			path: targetPath
		};
	} catch {
		return invalidPath(params.scopeLabel);
	}
}
function resolvePathsWithinRoot(params) {
	const resolvedPaths = [];
	for (const raw of params.requestedPaths) {
		const pathResult = resolvePathWithinRoot({
			rootDir: params.rootDir,
			requestedPath: raw,
			scopeLabel: params.scopeLabel
		});
		if (!pathResult.ok) return {
			ok: false,
			error: pathResult.error
		};
		resolvedPaths.push(pathResult.path);
	}
	return {
		ok: true,
		paths: resolvedPaths
	};
}
async function resolveExistingPathsWithinRoot(params) {
	return await resolveCheckedPathsWithinRoot(params, true);
}
async function resolveStrictExistingPathsWithinRoot(params) {
	return await resolveCheckedPathsWithinRoot(params, false);
}
function pathScope(rootDir, options) {
	const base = {
		rootDir,
		scopeLabel: options.label
	};
	return {
		rootDir,
		label: options.label,
		resolve: (requestedPath, pathOptions) => resolvePathWithinRoot({
			...base,
			requestedPath,
			defaultFileName: pathOptions?.defaultName
		}),
		resolveAll: (requestedPaths) => resolvePathsWithinRoot({
			...base,
			requestedPaths
		}),
		existing: (requestedPaths) => resolveExistingPathsWithinRoot({
			...base,
			requestedPaths
		}),
		files: (requestedPaths) => resolveStrictExistingPathsWithinRoot({
			...base,
			requestedPaths
		}),
		writable: (requestedPath, pathOptions) => resolveWritablePathWithinRoot({
			...base,
			requestedPath,
			defaultFileName: pathOptions?.defaultName
		}),
		ensureDir: (requestedPath, pathOptions) => ensureDirectoryWithinRoot({
			...base,
			requestedPath,
			defaultDirName: pathOptions?.defaultName,
			mode: pathOptions?.mode
		})
	};
}
async function resolveCheckedPathsWithinRoot(params, allowMissingFallback) {
	const rootDir = path.resolve(params.rootDir);
	const rootRealPath = await resolveRealPathIfExists(rootDir);
	const root$1 = rootRealPath ? await root(rootDir) : void 0;
	const isInRoot = (relativePath) => Boolean(relativePath) && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
	const resolveExistingRelativePath = async (requestedPath) => {
		const raw = requestedPath.trim();
		const lexicalPathResult = resolvePathWithinRoot({
			rootDir,
			requestedPath,
			scopeLabel: params.scopeLabel
		});
		if (lexicalPathResult.ok) return {
			ok: true,
			relativePath: path.relative(rootDir, lexicalPathResult.path),
			fallbackPath: lexicalPathResult.path
		};
		if (!rootRealPath || !raw || !path.isAbsolute(raw)) return lexicalPathResult;
		try {
			const resolvedExistingPath = await fs.realpath(raw);
			const relativePath = path.relative(rootRealPath, resolvedExistingPath);
			if (!isInRoot(relativePath)) return lexicalPathResult;
			return {
				ok: true,
				relativePath,
				fallbackPath: resolvedExistingPath
			};
		} catch {
			return lexicalPathResult;
		}
	};
	const resolvedPaths = [];
	for (const raw of params.requestedPaths) {
		const pathResult = await resolveExistingRelativePath(raw);
		if (!pathResult.ok) return {
			ok: false,
			error: pathResult.error
		};
		let opened;
		try {
			if (!root$1) throw new FsSafeError("not-found", "root dir not found");
			opened = await root$1.open(pathResult.relativePath);
			resolvedPaths.push(opened.realPath);
		} catch (err) {
			if (allowMissingFallback && err instanceof FsSafeError && err.code === "not-found") {
				resolvedPaths.push(pathResult.fallbackPath);
				continue;
			}
			if (err instanceof FsSafeError && err.code === "outside-workspace") return {
				ok: false,
				error: `File is outside ${params.scopeLabel}`
			};
			return {
				ok: false,
				error: `Invalid path: must stay within ${params.scopeLabel} and be a regular non-symlink file`
			};
		} finally {
			await opened?.handle.close().catch(() => {});
		}
	}
	return {
		ok: true,
		paths: resolvedPaths
	};
}
//#endregion
//#region src/security/channel-metadata.ts
const DEFAULT_MAX_CHARS = 800;
const DEFAULT_MAX_ENTRY_CHARS = 400;
function normalizeEntry(entry) {
	return entry.replace(/\s+/g, " ").trim();
}
function truncateText(value, maxChars) {
	if (maxChars <= 0) return "";
	if (value.length <= maxChars) return value;
	return `${value.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}
function buildUntrustedChannelMetadata(params) {
	const deduped = params.entries.map((entry) => typeof entry === "string" ? normalizeEntry(entry) : "").filter((entry) => Boolean(entry)).map((entry) => truncateText(entry, DEFAULT_MAX_ENTRY_CHARS)).filter((entry, index, list) => list.indexOf(entry) === index);
	if (deduped.length === 0) return;
	const body = deduped.join("\n");
	return wrapExternalContent(truncateText(`${`UNTRUSTED channel metadata (${params.source})`}\n${`${params.label}:\n${body}`}`, params.maxChars ?? DEFAULT_MAX_CHARS), {
		source: "channel_metadata",
		includeWarning: false
	});
}
//#endregion
//#region src/plugin-sdk/security-runtime.ts
async function openFileWithinRoot(params) {
	return await (await root(params.rootDir)).open(params.relativePath, {
		hardlinks: params.rejectHardlinks === false ? "allow" : "reject",
		nonBlockingRead: params.nonBlockingRead,
		symlinks: params.allowSymlinkTargetWithinRoot === true ? "follow-within-root" : "reject"
	});
}
async function writeFileFromPathWithinRoot(params) {
	await (await root(params.rootDir)).copyIn(params.relativePath, params.sourcePath, {
		mkdir: params.mkdir,
		sourceHardlinks: "reject"
	});
}
//#endregion
export { resolveExistingPathsWithinRoot as a, resolveStrictExistingPathsWithinRoot as c, pathScope as i, resolveWritablePathWithinRoot as l, writeFileFromPathWithinRoot as n, resolvePathWithinRoot as o, buildUntrustedChannelMetadata as r, resolvePathsWithinRoot as s, openFileWithinRoot as t };
