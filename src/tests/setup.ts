import { server } from "@/tests/server";
import "@testing-library/jest-dom/vitest";
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from "vitest";

beforeEach(() => {
	server.listen();
	cleanup();
});
afterEach(() => {
	server.close();
});
