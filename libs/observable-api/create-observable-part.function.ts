import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { MappingFunction, MemoizationFunction, defaultMemoization } from './deep-state';

/**
 * @export
 * @method createObservablePart
 * @param {Observable<T>} source - RxJS Subject to use for this Observable.
 * @param {(mappable: T) => R} mappingFunction - Method to return the part for this Observable to return.
 * @param {(previousResult: R, currentResult: R) => boolean} [memoizationFunction] - Method to Compare if the data has changed. Should return true when data is different.
 * @description - Creates a RxJS Observable from RxJS Subject.
 * @example <caption>Example create a Observable for part of the data Subject.</caption>
 * public readonly myPart = CreateObservablePart(this._data, (data) => data.myPart);
 */

export function createObservablePart<R, T>(
	source$: Observable<T>,
	mappingFunction: MappingFunction<T, R>,
	memoizationFunction?: MemoizationFunction<R>
): Observable<R> {
	return source$.pipe(
		map(mappingFunction),
		distinctUntilChanged(memoizationFunction || defaultMemoization),
		shareReplay(1)
	);
}
