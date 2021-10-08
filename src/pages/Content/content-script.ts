import { DomApi } from "./helpers/dom-api";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";
import { EnpointService } from "./endpoint-service";
import { EventService } from "./event-service";

const musicStreamingApi = new MusicStreamingApi(new DomApi());

const enpointsService = new EnpointService(musicStreamingApi);
enpointsService.init();

const eventService = new EventService(musicStreamingApi);
eventService.init();
