import { rest } from 'msw';
import { toNumber } from 'lodash-es';
import { umbracoPath } from '@umbraco-cms/utils';
import { PagedRedirectUrl, RedirectUrl, RedirectStatus, RedirectUrlStatus } from '@umbraco-cms/backend-api';

export const handlers = [
	rest.get(umbracoPath('/redirect-management'), (_req, res, ctx) => {
		const filter = _req.url.searchParams.get('filter');
		const skip = toNumber(_req.url.searchParams.get('skip'));
		const take = toNumber(_req.url.searchParams.get('take'));

		console.log('handler file', filter);
		if (filter) {
			const filtered: RedirectUrl[] = [];

			PagedRedirectUrlData.items.forEach((item) => {
				if (item.originalUrl?.includes(filter)) filtered.push(item);
			});
			const filteredPagedData: PagedRedirectUrl = {
				total: filtered.length,
				items: filtered.slice(skip, skip + take),
			};
			return res(ctx.status(200), ctx.json<PagedRedirectUrl>(filteredPagedData));
		} else {
			const items = PagedRedirectUrlData.items.slice(skip, skip + take);

			const PagedData: PagedRedirectUrl = {
				total: PagedRedirectUrlData.total,
				items,
			};
			return res(ctx.status(200), ctx.json<PagedRedirectUrl>(PagedData));
		}
	}),

	rest.get(umbracoPath('/redirect-management/:key'), async (_req, res, ctx) => {
		const key = _req.params.key as string;
		if (!key) return res(ctx.status(404));

		const PagedRedirectUrlObject = _getRedirectUrlByKey(key);

		return res(ctx.status(200), ctx.json<PagedRedirectUrl>(PagedRedirectUrlObject));
	}),

	rest.delete(umbracoPath('/redirect-management/:key'), async (_req, res, ctx) => {
		const key = _req.params.key as string;
		if (!key) return res(ctx.status(404));

		const PagedRedirectUrlObject = _deleteRedirectUrlByKey(key);

		return res(ctx.status(200), ctx.json<any>(PagedRedirectUrlObject));
	}),

	rest.get(umbracoPath('/redirect-management/status'), (_req, res, ctx) => {
		return res(ctx.status(200), ctx.json<RedirectUrlStatus>(UrlTracker));
	}),

	rest.post(umbracoPath('redirect-management/status'), async (_req, res, ctx) => {
		UrlTracker.status = UrlTracker.status === RedirectStatus.ENABLED ? RedirectStatus.DISABLED : RedirectStatus.ENABLED;
		return res(ctx.status(200), ctx.json<any>(UrlTracker.status));
	}),
];

// Mock Data

const UrlTracker: RedirectUrlStatus = { status: RedirectStatus.ENABLED, userIsAdmin: true };

const _getRedirectUrlByKey = (key: string) => {
	const PagedResult: PagedRedirectUrl = {
		total: 0,
		items: [],
	};
	RedirectUrlData.forEach((data) => {
		if (data.key?.includes(key)) {
			PagedResult.items.push(data);
			PagedResult.total++;
		}
	});
	return PagedResult;
};

const _deleteRedirectUrlByKey = (key: string) => {
	const index = RedirectUrlData.findIndex((data) => data.key === key);
	if (index > -1) RedirectUrlData.splice(index, 1);
	const PagedResult: PagedRedirectUrl = {
		items: RedirectUrlData,
		total: RedirectUrlData.length,
	};
	return PagedResult;
};

const RedirectUrlData: RedirectUrl[] = [
	{
		key: '1',
		created: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'kitty.com',
		originalUrl: 'kitty.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9f2',
	},
	{
		key: '2',
		created: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'umbraco.com',
		originalUrl: 'umbraco.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9f',
	},
	{
		key: '3',
		created: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'uui.umbraco.com',
		originalUrl: 'uui.umbraco.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9f23',
	},
	{
		key: '4',
		created: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'umbracoffee.com',
		originalUrl: 'umbracoffee.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9fdsaa',
	},
	{
		key: '5',
		created: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'section/settings',
		originalUrl: 'section/settings/123',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9f2e23',
	},
	{
		key: '6',
		created: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'dxp.com',
		originalUrl: 'dxp.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9fsafsfd',
	},
	{
		key: '7',
		created: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'google.com',
		originalUrl: 'google.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9f2cxza',
	},
	{
		key: '8',
		created: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'unicorns.com',
		originalUrl: 'unicorns.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31d9fweds',
	},
	{
		key: '9',
		created: '2022-12-05T13:59:43.6827244',
		destinationUrl: 'h5yr.com',
		originalUrl: 'h5yr.dk',
		contentKey: '7191c911-6747-4824-849e-5208e2b31ddsfsdsfadsfdx9f2',
	},
	{
		key: '10',
		created: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'our.umbraco.com',
		originalUrl: 'our.umbraco.dk',
		contentKey: '7191c911-6747-4824-849e-52dsacx08e2b31d9dsafdsff',
	},
	{
		key: '11',
		created: '2022-13-05T13:59:43.6827244',
		destinationUrl: 'your.umbraco.com',
		originalUrl: 'your.umbraco.dk',
		contentKey: '7191c911-6747-4824-849e-52dsacx08e2b31d9fsda',
	},
];

const PagedRedirectUrlData: PagedRedirectUrl = {
	total: RedirectUrlData.length,
	items: RedirectUrlData,
};
