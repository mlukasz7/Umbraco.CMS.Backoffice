import { UMB_ALLOWED_DOCUMENT_TYPES_MODAL_TOKEN } from '../../../document-types/modals/allowed-document-types';
import type { UmbDocumentRepository } from '../../repository/document.repository';
import { UmbEntityActionBase } from '@umbraco-cms/entity-action';
import { UmbControllerHostInterface } from '@umbraco-cms/controller';
import { UmbModalContext, UMB_MODAL_CONTEXT_TOKEN } from '@umbraco-cms/modal';
import { UmbContextConsumerController } from '@umbraco-cms/context-api';

export class UmbCreateDocumentEntityAction extends UmbEntityActionBase<UmbDocumentRepository> {
	#modalContext?: UmbModalContext;

	constructor(host: UmbControllerHostInterface, repositoryAlias: string, unique: string) {
		super(host, repositoryAlias, unique);

		new UmbContextConsumerController(this.host, UMB_MODAL_CONTEXT_TOKEN, (instance) => {
			this.#modalContext = instance;
		});
	}

	async execute() {
		// TODO: what to do if modal service is not available?
		if (!this.#modalContext) return;
		if (!this.repository) return;

		const { data } = await this.repository.requestByKey(this.unique);

		if (data && data.contentTypeKey) {
			const modalHandler = this.#modalContext?.open(UMB_ALLOWED_DOCUMENT_TYPES_MODAL_TOKEN, {
				key: data.contentTypeKey,
			});

			const { documentTypeKey } = await modalHandler.onSubmit();
			// TODO: how do we want to generate these urls?
			history.pushState(null, '', `/section/content/workspace/document/create/${this.unique}/${documentTypeKey}`);
		}
	}
}
