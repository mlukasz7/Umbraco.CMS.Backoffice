import { BehaviorSubject } from 'rxjs';
import { UmbContextToken } from '@umbraco-cms/context-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { UmbStoreBase } from '@umbraco-cms/store';

/**
 * Store for Packages
 * @export
 * @extends {UmbStoreBase}
 */
export class UmbPackageStore extends UmbStoreBase {
	/**
	 * Array of packages with extensions
	 * @private
	 */
	#data = new BehaviorSubject<any[]>([]); // TODO: Replace with PackageModel

	/**
	 * Observable of packages with extensions
	 */
	rootItems = this.#data.asObservable();

	/**
	 * Creates an instance of PackageStore.
	 * @param {UmbControllerHostInterface} host
	 * @memberof PackageStore
	 */
	constructor(host: UmbControllerHostInterface) {
		super(host, UmbPackageStore.name);
	}

	// TODO: Add model for packages when available
	/**
	 * Append items to the store
	 */
	appendItems(packages: Array<any>) {
		this.#data.next(packages);
	}
}

export const UMB_PACKAGE_STORE_TOKEN = new UmbContextToken<UmbPackageStore>(UmbPackageStore.name);
