import { a as isPathInsideWithRealpath, i as isPathInside } from "./path-B_sJyaoq.js";
import { g as pathExists } from "./fs-safe-C91ZNyPb.js";
import { N as validateRegistryNpmSpec } from "./discovery-2MIOFP_D.js";
import { r as readJson } from "./json-files-DbKnK_Nw.js";
import "./scan-paths-CUHtu5iT.js";
import { s as resolveArchiveKind } from "./archive-BJR-_kR4.js";
import "./archive-DSpvxpCs.js";
import { r as resolveArchiveSourcePath } from "./install-source-utils-B1li3Vf_.js";
import { i as withExtractedArchiveRoot, n as installPackageDirWithManifestDeps, r as resolveExistingInstallPath, t as installPackageDir } from "./install-package-dir-NrU5WL96.js";
import { a as finalizeNpmSpecArchiveInstall, i as resolveTimedInstallModeOptions, n as resolveCanonicalInstallTarget, o as installFromNpmSpecArchiveWithInstaller, r as resolveInstallModeOptions, t as ensureInstallTargetAvailable } from "./install-target-Cp6NKiJ_.js";
//#region src/infra/install-from-npm-spec.ts
async function installFromValidatedNpmSpecArchive(params) {
	const spec = params.spec.trim();
	const specError = validateRegistryNpmSpec(spec);
	if (specError) return {
		ok: false,
		error: specError
	};
	return finalizeNpmSpecArchiveInstall(await installFromNpmSpecArchiveWithInstaller({
		tempDirPrefix: params.tempDirPrefix,
		spec,
		timeoutMs: params.timeoutMs,
		expectedIntegrity: params.expectedIntegrity,
		onIntegrityDrift: params.onIntegrityDrift,
		warn: params.warn,
		installFromArchive: params.installFromArchive,
		archiveInstallParams: params.archiveInstallParams
	}));
}
//#endregion
export { ensureInstallTargetAvailable, pathExists as fileExists, installFromValidatedNpmSpecArchive, installPackageDir, installPackageDirWithManifestDeps, isPathInside, isPathInsideWithRealpath, readJson as readJsonFile, resolveArchiveKind, resolveArchiveSourcePath, resolveCanonicalInstallTarget, resolveExistingInstallPath, resolveInstallModeOptions, resolveTimedInstallModeOptions, withExtractedArchiveRoot };
