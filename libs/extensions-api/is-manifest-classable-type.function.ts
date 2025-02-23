import { isManifestJSType } from './is-manifest-js-type.function';
import { isManifestLoaderType } from './is-manifest-loader-type.function';
import { isManifestClassConstructorType } from './is-manifest-class-instance-type.function';
import type { ManifestBase, ManifestClass } from '@umbraco-cms/extensions-registry';

export function isManifestClassableType(manifest: ManifestBase): manifest is ManifestClass {
	return isManifestClassConstructorType(manifest) || isManifestLoaderType(manifest) || isManifestJSType(manifest);
}
