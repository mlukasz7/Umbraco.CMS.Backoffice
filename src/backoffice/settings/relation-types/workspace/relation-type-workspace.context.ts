import { UmbWorkspaceContext } from '../../../shared/components/workspace/workspace-context/workspace-context';
import { UmbRelationTypeRepository } from '../repository/relation-type.repository';
import { UmbEntityWorkspaceContextInterface } from '../../../shared/components/workspace/workspace-context/workspace-entity-context.interface';
import type { RelationTypeBaseModel, RelationTypeResponseModel } from '@umbraco-cms/backend-api';

import { ObjectState } from '@umbraco-cms/observable-api';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';

export class UmbRelationTypeWorkspaceContext
	extends UmbWorkspaceContext<UmbRelationTypeRepository>
	implements UmbEntityWorkspaceContextInterface<RelationTypeResponseModel | undefined>
{
	#data = new ObjectState<RelationTypeResponseModel | undefined>(undefined);
	data = this.#data.asObservable();
	name = this.#data.getObservablePart((data) => data?.name);
	key = this.#data.getObservablePart((data) => data?.key);

	constructor(host: UmbControllerHostInterface) {
		super(host, new UmbRelationTypeRepository(host));
	}

	async load(key: string) {
		const { data } = await this.repository.requestByKey(key);

		if (data) {
			this.setIsNew(false);
			this.#data.update(data);
		}
	}

	async createScaffold(parentKey: string | null) {
		const { data } = await this.repository.createScaffold(parentKey);
		if (!data) return;
		this.setIsNew(true);
		this.#data.next(data);
	}

	getData() {
		return this.#data.getValue();
	}

	getEntityKey() {
		return this.getData()?.key || '';
	}

	getEntityType() {
		return 'relation-type';
	}

	setName(name: string) {
		this.#data.update({ name });
	}

	async save() {
		if (!this.#data.value) return;
		if (this.isNew) {
			await this.repository.create(this.#data.value);
		} else {
			await this.repository.save(this.#data.value);
		}
		// If it went well, then its not new anymore?.

		this.setIsNew(false);
	}

	update<K extends keyof RelationTypeBaseModel>(key: K, value: RelationTypeBaseModel[K]) {
		console.log('update', key, value);

		this.#data.next({ ...this.#data.value, [key]: value });
	}

	async delete(key: string) {
		await this.repository.delete(key);
	}

	public destroy(): void {
		this.#data.complete();
	}
}
