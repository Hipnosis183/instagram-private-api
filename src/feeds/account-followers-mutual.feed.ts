import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';

export class AccountFollowersMutualFeed extends Feed<any> {
  id: number | string;
  @Expose()
  public nextMaxId: string;

  set state(body: any) {
    this.moreAvailable = !!body.next_max_id;
    this.nextMaxId = body.next_max_id;
  }

  async request() {
    const { body } = await this.client.request.send<any>({
      url: `/api/v1/friendships/${this.id}/mutual_followers/`,
      qs: {
        max_id: this.nextMaxId,
        page_size: 24,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.users;
  }
}
