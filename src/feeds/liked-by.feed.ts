import { Feed } from '../core/feed';
import { Expose } from 'class-transformer';

export class LikedByFeed extends Feed<any> {
  shortcode: string;

  @Expose()
  private nextCursor: string = null;

  protected set state(response: any) {
    const { end_cursor, has_next_page } = response.page_info;
    this.moreAvailable = has_next_page;
    this.nextCursor = end_cursor;
  }

  async request(): Promise<any> {
    const { body } = await this.client.request.send(
      {
        url: `/graphql/query/`,
        qs: {
          query_hash: 'd5d763b1e2acf209d62d22d184488e57',
          variables: JSON.stringify({
            shortcode: this.shortcode,
            include_reel: true,
            first: 24,
            after: this.nextCursor,
          }),
        },
      },
      true,
      true,
    );
    this.state = body.data.shortcode_media.edge_liked_by;
    return body.data.shortcode_media.edge_liked_by;
  }

  async items(): Promise<any[]> {
    const res = await this.request();
    return res.edges.map((i: any) => i.node);
  }
}
