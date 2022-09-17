import { IgApiClient } from './client';
import {
  AccountFollowersMutualFeed,
  AccountFollowersFeed,
  AccountFollowingFeed,
  BestiesFeed,
  BlockedUsersFeed,
  ClipsFeed,
  CollectionFeed,
  CollectionsFeed,
  DirectInboxFeed,
  DirectPendingInboxFeed,
  DirectThreadFeed,
  DiscoverFeed,
  PostsInsightsFeed,
  LocationFeed,
  MediaCommentsFeed,
  MediaCommentsChildFeed,
  MusicGenreFeed,
  MusicMoodFeed,
  MusicSearchFeed,
  MusicTrendingFeed,
  NewsFeed,
  PendingFriendshipsFeed,
  ReelsMediaFeed,
  ReelsTrayFeed,
  SavedFeed,
  StoriesInsightsFeed,
  TagFeed,
  TagsFeed,
  TimelineFeed,
  UserFeed,
  UsertagsFeed,
  IgtvBrowseFeed,
  IgtvChannelFeed,
  VideoFeed,
  LikedFeed,
  LikedByFeed,
  TopicalExploreFeed,
} from '../feeds';
import { DirectInboxFeedResponseThreadsItem } from '../responses';
import { plainToClassFromExist } from 'class-transformer';
import * as Chance from 'chance';
import { PostsInsightsFeedOptions, TimelineFeedReason, IgAppModule } from '../types';
import { UserStoryFeed } from '../feeds/user-story.feed';
import { ListReelMediaViewerFeed } from '../feeds/list-reel-media-viewer.feed';
import { MediaStickerResponsesFeed } from '../feeds/media.sticker-responses.feed';
import {
  StorySliderVotersFeedResponseResponseRootObject,
  StorySliderVotersFeedResponseResponseVotersItem,
  StoryQuestionResponsesFeedResponseRespondersItem,
  StoryQuestionResponsesFeedResponseRootObject,
  StoryQuizParticipantsFeedResponseParticipantsItem,
  StoryQuizParticipantsFeedResponseRootObject,
  StoryPollVotersFeedResponseRootObject,
  StoryPollVotersFeedResponseVotersItem,
} from '../responses';

export class FeedFactory {
  constructor(private client: IgApiClient) {}

  public accountFollowersMutual(id: string | number): AccountFollowersMutualFeed {
    const feed = new AccountFollowersMutualFeed(this.client);
    feed.id = id;
    return feed;
  }

  public accountFollowers(
    options?:
      | string
      | number
      | Partial<Pick<AccountFollowersFeed, 'searchSurface' | 'order' | 'query' | 'count' | 'enableGroups' | 'id'>>,
  ): AccountFollowersFeed {
    return plainToClassFromExist(new AccountFollowersFeed(this.client), {
      id: options && typeof options !== 'object' ? options : this.client.state.cookieUserId,
      ...(typeof options === 'object' ? options : undefined),
    });
  }

  public accountFollowing(
    options?:
      | string
      | number
      | Partial<
          Pick<
            AccountFollowingFeed,
            'searchSurface' | 'order' | 'query' | 'count' | 'enableGroups' | 'includesHashtags' | 'id'
          >
        >,
  ): AccountFollowingFeed {
    return plainToClassFromExist(new AccountFollowingFeed(this.client), {
      id: options && typeof options !== 'object' ? options : this.client.state.cookieUserId,
      ...(typeof options === 'object' ? options : undefined),
    });
  }

  public news(): NewsFeed {
    return new NewsFeed(this.client);
  }

  public discover(): DiscoverFeed {
    return new DiscoverFeed(this.client);
  }

  public pendingFriendships(): PendingFriendshipsFeed {
    return new PendingFriendshipsFeed(this.client);
  }

  public bestFriendships(): BestiesFeed {
    return new BestiesFeed(this.client);
  }

  public blockedUsers(): BlockedUsersFeed {
    return new BlockedUsersFeed(this.client);
  }

  public clips(id: string | number, max_id?: string | number): ClipsFeed {
    const feed = new ClipsFeed(this.client);
    feed.id = id;
    feed.max_id = max_id;
    return feed;
  }

  public directInbox(): DirectInboxFeed {
    return new DirectInboxFeed(this.client);
  }

  public directPending(): DirectPendingInboxFeed {
    return new DirectPendingInboxFeed(this.client);
  }

  public directThread(
    options: Pick<DirectInboxFeedResponseThreadsItem, 'thread_id' | 'oldest_cursor'>,
    seqId?: number,
  ): DirectThreadFeed {
    const feed = new DirectThreadFeed(this.client);
    feed.id = options.thread_id;
    feed.cursor = options.oldest_cursor;
    feed.seqId = seqId;
    return feed;
  }

  public user(id: string | number): UserFeed {
    const feed = new UserFeed(this.client);
    feed.id = id;
    return feed;
  }

  public tag(tag: string): TagFeed {
    const feed = new TagFeed(this.client);
    feed.tag = tag;
    return feed;
  }

  public tags(tag: string, tab: 'top' | 'recent' | 'places' = 'top'): TagsFeed {
    const feed = new TagsFeed(this.client);
    feed.tag = tag;
    feed.tab = tab;
    return feed;
  }

  public location(id: string | number, tab: 'recent' | 'ranked' = 'ranked'): LocationFeed {
    const feed = new LocationFeed(this.client);
    feed.id = id;
    feed.tab = tab;
    return feed;
  }

  public mediaComments(id: string): MediaCommentsFeed {
    const feed = new MediaCommentsFeed(this.client);
    feed.id = id;
    return feed;
  }

  public mediaCommentsChild(mediaId: string, commentId: string): MediaCommentsChildFeed {
    const feed = new MediaCommentsChildFeed(this.client);
    feed.mediaId = mediaId;
    feed.commentId = commentId;
    return feed;
  }

  public reelsMedia(options: { userIds: Array<number | string>; source?: IgAppModule }): ReelsMediaFeed {
    return plainToClassFromExist(new ReelsMediaFeed(this.client), options);
  }

  public userStory(userId: string | number): UserStoryFeed {
    return plainToClassFromExist(new UserStoryFeed(this.client), { userId });
  }

  public reelsTray(reason: 'pull_to_refresh' | 'cold_start' = 'cold_start'): ReelsTrayFeed {
    return plainToClassFromExist(new ReelsTrayFeed(this.client), { reason });
  }

  public timeline(reason?: TimelineFeedReason): TimelineFeed {
    const feed = new TimelineFeed(this.client);
    if (reason) {
      feed.reason = reason;
    }
    return feed;
  }

  public musicTrending(product: IgAppModule = 'story_camera_music_overlay_post_capture'): MusicTrendingFeed {
    return plainToClassFromExist(new MusicTrendingFeed(this.client), { product });
  }

  public musicSearch(query: string, product: IgAppModule = 'story_camera_music_overlay_post_capture'): MusicSearchFeed {
    const options = {
      query,
      product,
      searchSessionId: new Chance(query).guid(),
    };
    return plainToClassFromExist(new MusicSearchFeed(this.client), options);
  }

  public musicGenre(
    id: number | string,
    product: IgAppModule = 'story_camera_music_overlay_post_capture',
  ): MusicGenreFeed {
    return plainToClassFromExist(new MusicGenreFeed(this.client), {
      id,
      product,
    });
  }

  public musicMood(
    id: number | string,
    product: IgAppModule = 'story_camera_music_overlay_post_capture',
  ): MusicMoodFeed {
    return plainToClassFromExist(new MusicMoodFeed(this.client), {
      id,
      product,
    });
  }

  public usertags(id: number | string): UsertagsFeed {
    return plainToClassFromExist(new UsertagsFeed(this.client), { id });
  }

  public postsInsightsFeed(options: PostsInsightsFeedOptions) {
    return plainToClassFromExist(new PostsInsightsFeed(this.client), { options });
  }

  public storiesInsights(timeframe: 'ONE_DAY' | 'ONE_WEEK' | 'TWO_WEEKS') {
    return plainToClassFromExist(new StoriesInsightsFeed(this.client), { timeframe });
  }

  public collection(id: string | number): CollectionFeed {
    const feed = new CollectionFeed(this.client);
    feed.id = id;
    return feed;
  }

  public collections(): CollectionsFeed {
    return new CollectionsFeed(this.client);
  }

  public saved(): SavedFeed {
    return new SavedFeed(this.client);
  }

  public listReelMediaViewers(mediaId: string): ListReelMediaViewerFeed {
    return plainToClassFromExist(new ListReelMediaViewerFeed(this.client), { mediaId });
  }

  public igtvBrowse(isPrefetch?: boolean): IgtvBrowseFeed {
    return plainToClassFromExist(new IgtvBrowseFeed(this.client), {
      isPrefetch: !!isPrefetch,
    });
  }

  public storyQuestionResponses(
    mediaId: string,
    stickerId: string | number,
  ): MediaStickerResponsesFeed<
    StoryQuestionResponsesFeedResponseRootObject,
    StoryQuestionResponsesFeedResponseRespondersItem
  > {
    return plainToClassFromExist(new MediaStickerResponsesFeed<any, any>(this.client), {
      mediaId,
      stickerId,
      name: 'story_question_responses',
      rootName: 'responder_info',
      itemName: 'responders',
    });
  }

  public storyPollVoters(
    mediaId: string,
    stickerId: string | number,
  ): MediaStickerResponsesFeed<StoryPollVotersFeedResponseRootObject, StoryPollVotersFeedResponseVotersItem> {
    return plainToClassFromExist(new MediaStickerResponsesFeed<any, any>(this.client), {
      mediaId,
      stickerId,
      name: 'story_poll_voters',
      rootName: 'voter_info',
      itemName: 'voters',
    });
  }

  public storyQuizParticipants(
    mediaId: string,
    stickerId: string | number,
  ): MediaStickerResponsesFeed<
    StoryQuizParticipantsFeedResponseRootObject,
    StoryQuizParticipantsFeedResponseParticipantsItem
  > {
    return plainToClassFromExist(new MediaStickerResponsesFeed<any, any>(this.client), {
      mediaId,
      stickerId,
      name: 'story_quiz_participants',
      rootName: 'participant_info',
      itemName: 'participants',
    });
  }

  public storySliderVoters(
    mediaId: string,
    stickerId: string | number,
  ): MediaStickerResponsesFeed<
    StorySliderVotersFeedResponseResponseRootObject,
    StorySliderVotersFeedResponseResponseVotersItem
  > {
    return plainToClassFromExist(new MediaStickerResponsesFeed<any, any>(this.client), {
      mediaId,
      stickerId,
      name: 'story_slider_voters',
      rootName: 'voter_info',
      itemName: 'voters',
    });
  }

  public igtvChannel(id: string | number) {
    if (/[0-9]/.test(id.toString())) {
      id = `user_${id}`;
    }
    return plainToClassFromExist(new IgtvChannelFeed(this.client), {
      channelId: id,
    });
  }

  /**
   * Returns the suggested videos after the current (id) one
   * @param id pk of the video
   */
  public igtvChaining(id: string | number) {
    return this.igtvChannel(`chaining_${id}`);
  }

  public video(id: string | number): VideoFeed {
    const feed = new VideoFeed(this.client);
    feed.id = id;
    return feed;
  }

  public liked(): LikedFeed {
    return new LikedFeed(this.client);
  }

  public likedBy(shortcode: string): LikedByFeed {
    const feed = new LikedByFeed(this.client);
    feed.shortcode = shortcode;
    return feed;
  }

  public topicalExplore(
    options: Partial<Pick<TopicalExploreFeed, 'sessionId' | 'clusterId' | 'lat' | 'lng' | 'module'>> = {},
  ): TopicalExploreFeed {
    return plainToClassFromExist(new TopicalExploreFeed(this.client), options);
  }
}
