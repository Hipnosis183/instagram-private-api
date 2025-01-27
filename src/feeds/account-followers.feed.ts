import { Expose, plainToClassFromExist } from 'class-transformer';
import { Feed } from '../core/feed';
import { AccountFollowersFeedResponse, AccountFollowersFeedResponseUsersItem } from '../responses';

export class AccountFollowersFeed extends Feed<AccountFollowersFeedResponse, AccountFollowersFeedResponseUsersItem> {
  searchSurface?: string;
  order?: 'default' = 'default';
  query = '';
  count?: number;
  enableGroups = true;

  id: number | string;
  @Expose()
  public nextMaxId: string;

  set state(body: AccountFollowersFeedResponse) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }

  async request() {
    const { body } = await this.client.request.send<AccountFollowersFeedResponse>({
      url: `/api/v1/friendships/${this.id}/followers/`,
      qs: {
        max_id: this.nextMaxId,
        search_surface: this.searchSurface,
        order: this.order,
        query: this.query,
        count: this.count,
        enable_groups: this.enableGroups,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.users.map(user => plainToClassFromExist(new AccountFollowersFeedResponseUsersItem(this.client), user));
  }
}
