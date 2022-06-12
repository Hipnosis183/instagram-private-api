import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';

export class VideoFeed extends Feed<any> {
  id: number | string;

  @Expose()
  private nextCursor: string = null;

  protected set state(response: any) {
    const { end_cursor, has_next_page } = response.page_info;
    this.moreAvailable = has_next_page;
    this.nextCursor = end_cursor;
  }

  async request(): Promise<any> {
    const { body } = await this.client.request.send({
      url: `/graphql/query/`,
      graphql: true,
      qs: {
        query_hash: 'bc78b344a68ed16dd5d7f264681c4c76',
        variables: JSON.stringify({
          id: this.id,
          first: 24,
          after: this.nextCursor,
        }),
      },
    }, true);
    this.state = body.data.user.edge_felix_video_timeline;
    return body.data.user.edge_felix_video_timeline;
  }

  async items(): Promise<any[]> {
    const res = await this.request();
    return res.edges;
  }
}
