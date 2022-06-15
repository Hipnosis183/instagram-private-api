import { Repository } from '../core/repository';
import {
  FbsearchRepositoryPlacesResponseRootObject,
  FbsearchRepositoryTopsearchFlatResponseRootObject,
} from '../responses';

export class FbsearchRepository extends Repository {
  async suggestedSearches(type: 'blended' | 'users' | 'hashtags' | 'places') {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/suggested_searches/',
      qs: {
        type,
      },
    });
    return body;
  }
  async recentSearches() {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/recent_searches/',
    });
    return body;
  }
  async registerRecentSearch(id: string, type: 'user' | 'hashtag' | 'place' | 'keyword') {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/register_recent_search_click/',
      method: 'POST',
      form: {
        entity_id: id,
        entity_type: type,
      },
    });
    return body;
  }
  async hideSearchEntities(entities: { hashtag?: string; place?: string; user?: string; keyword_names?: string }) {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/hide_search_entities/',
      method: 'POST',
      // Required since the section parameter value 'recent' doesn't get recognised when passed as a string.
      form: `section=recent&hashtag=[${entities.hashtag || ''}]&place=[${entities.place || ''}]&user=[${entities.user ||
        ''}]&keyword_names=[${entities.keyword_names || ''}]`,
    });
    return body;
  }
  async clearSearchHistory() {
    const { body } = await this.client.request.send({
      url: '/api/v1/fbsearch/clear_search_history/',
      method: 'POST',
    });
    return body;
  }
  async topsearchFlat(query: string): Promise<FbsearchRepositoryTopsearchFlatResponseRootObject> {
    const { body } = await this.client.request.send<FbsearchRepositoryTopsearchFlatResponseRootObject>({
      url: '/api/v1/fbsearch/topsearch_flat/',
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
        context: 'blended',
      },
    });
    return body;
  }
  async places(query: string) {
    const { body } = await this.client.request.send<FbsearchRepositoryPlacesResponseRootObject>({
      url: '/api/v1/fbsearch/places/',
      qs: {
        timezone_offset: this.client.state.timezoneOffset,
        count: 30,
        query,
      },
    });
    return body;
  }
}
