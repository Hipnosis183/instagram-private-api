import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';

export class CollectionsFeed extends Feed<any> {
  @Expose()
  private nextMaxId: string;

  set state(body: any) {
    this.moreAvailable = body.more_available;
    this.nextMaxId = body.next_max_id;
  }

  async request(): Promise<any> {
    const { body } = await this.client.request.send({
      url: '/api/v1/collections/list/',
      qs: {
        max_id: this.nextMaxId,
        collection_types: '["ALL_MEDIA_AUTO_COLLECTION", "MEDIA"]',
        include_public_only: 0,
        get_cover_media_lists: true,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const body = await this.request();
    return body.items;
  }
}
