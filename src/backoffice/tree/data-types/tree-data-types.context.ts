import { map } from 'rxjs';
import { UmbTreeContextBase } from '../tree.context';

export class UmbTreeDataTypesContext extends UmbTreeContextBase {
	private _rootKey = '29d78e6c-c1bf-4c15-b820-d511c237ffae';

	public fetchRoot() {
		const data = {
			key: this._rootKey,
			name: 'Data Types',
			hasChildren: true,
			type: 'dataTypeRoot',
			icon: 'folder',
			parentKey: '',
			isTrashed: false,
		};
		this.entityStore.update([data]);
		return this.entityStore.items.pipe(map((items) => items.filter((item) => item.key === this._rootKey)));
	}

	public fetchChildren(key = '') {
		// TODO: figure out url structure
		fetch(`/umbraco/backoffice/entities/data-types?parentKey=${key}`)
			.then((res) => res.json())
			.then((data) => {
				this.entityStore.update(data);
			});

		return this.entityStore.items.pipe(map((items) => items.filter((item) => item.parentKey === key)));
	}
}
