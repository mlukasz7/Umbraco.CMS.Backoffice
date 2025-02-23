import type { RelationTypeResponseModel } from '@umbraco-cms/backend-api';
import { UmbContextToken } from '@umbraco-cms/context-api';
import { ArrayState } from '@umbraco-cms/observable-api';
import { UmbStoreBase } from '@umbraco-cms/store';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export const UMB_RELATION_TYPE_STORE_CONTEXT_TOKEN = new UmbContextToken<UmbRelationTypeStore>('UmbRelationTypeStore');

/**
 * @export
 * @class UmbRelationTypeStore
 * @extends {UmbStoreBase}
 * @description - Data Store for Template Details
 */
export class UmbRelationTypeStore extends UmbStoreBase {
	#data = new ArrayState<RelationTypeResponseModel>([], (x) => x.key);

	/**
	 * Creates an instance of UmbRelationTypeStore.
	 * @param {UmbControllerHostInterface} host
	 * @memberof UmbRelationTypeStore
	 */
	constructor(host: UmbControllerHostInterface) {
		super(host, UMB_RELATION_TYPE_STORE_CONTEXT_TOKEN.toString());
	}

	/**
	 * Append a relation-type to the store
	 * @param {RelationTypeResponseModel} RelationType
	 * @memberof UmbRelationTypeStore
	 */
	append(RelationType: RelationTypeResponseModel) {
		this.#data.append([RelationType]);
	}

	/**
	 * Append a relation-type to the store
	 * @param {key} RelationTypeResponseModel key.
	 * @memberof UmbRelationTypeStore
	 */
	byKey(key: RelationTypeResponseModel['key']) {
		return this.#data.getObservablePart((x) => x.find((y) => y.key === key));
	}

	/**
	 * Removes relation-types in the store with the given uniques
	 * @param {string[]} uniques
	 * @memberof UmbRelationTypeStore
	 */
	remove(uniques: Array<RelationTypeResponseModel['key']>) {
		this.#data.remove(uniques);
	}
}
