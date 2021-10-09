import { DomApi } from "./helpers/dom-api";
import { MusicStreamingApi } from "./music-streaming-api/music-streaming-api";
import { EndpointService } from "./endpoint-service";
import { EventService } from "./event-service";

const musicStreamingApi = new MusicStreamingApi(new DomApi());

const endpointsService = new EndpointService(musicStreamingApi);
endpointsService.init();

const eventService = new EventService(musicStreamingApi);
eventService.init();
