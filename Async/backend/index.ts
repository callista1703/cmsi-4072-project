import fastify, {
	FastifyInstance,
	FastifyRequest,
	FastifyReply,
} from "fastify";

interface IQueryInterface {
	username: string;
	password: string;
}

interface IHeaders {
	"x-access-token": string;
}

interface IReply {
	code: number;
	message: string;
	body: any;
}

const app: FastifyInstance = fastify({ logger: true });

async function userRoutes(app: FastifyInstance) {
	app.get("/user", async (request, reply) => {
		return { hello: "world" };
	});

	app.get("/", async (request, reply) => {
		return { hello: "ian" };
	});
}

app.get<{ Querystring: IQueryInterface; Headers: IHeaders; Reply: IReply }>(
	"/ping",
	async (request, reply) => {
		const { username, password } = request.query;
		return reply.send({
			code: 200,
			message: "success",
			body: { username, password },
		});
	}
);

app.register(userRoutes, { prefix: "/api" });

app.listen({ port: 8080 }, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`app listening at ${address}`);
});

["SIGINT", "SIGTERM"].forEach((signal) => {
	process.on(signal, async () => {
		await app.close();
		process.exit(0);
	});
});
