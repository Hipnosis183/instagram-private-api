import { Expose } from 'class-transformer';
import { Feed } from '../core/feed';

export class MediaCommentsChildFeed extends Feed<any> {
  mediaId: string;
  commentId: string;
  @Expose()
  private nextMaxId: string;
  @Expose()
  private nextMinId: string;

  set state(body: any) {
    this.moreAvailable = !!body.has_more_head_child_comments || !!body.has_more_tail_child_comments;
    this.nextMaxId = body.next_max_child_cursor;
    this.nextMinId = body.next_min_child_cursor;
  }

  async request() {
    const { body } = await this.client.request.send<any>({
      url: `/api/v1/media/${this.mediaId}/comments/${this.commentId}/child_comments/`,
      qs: {
        max_id: this.nextMaxId,
        min_id: this.nextMinId,
      },
    });
    this.state = body;
    return body;
  }

  async items() {
    const response = await this.request();
    return response.child_comments;
  }
}
