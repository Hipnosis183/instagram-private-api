import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';

export class SavedFeed extends Feed<any> {
  @Expose()
  private nextMaxId: string;

  set state(body: any) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.next_max_id;
  }

  async request(): Promise<any> {
    const { body } = await this.client.request.send({
      url: '/api/v1/feed/saved/posts/',
      qs: {
        max_id: this.nextMaxId,
      },
    });
    this.state = body;
    return body;
  }

  async items(): Promise<any[]> {
    const { items } = await this.request();
    return items.map((i: any) => i.media);
  }
}
