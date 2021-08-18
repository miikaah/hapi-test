import { server } from "./";
import request from "supertest";

export const app = request(server.listener);
