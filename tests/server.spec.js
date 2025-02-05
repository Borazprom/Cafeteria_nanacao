const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD", () => {
  it("Obteniendo todos los cafes", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    const { body } = await request(server).get("/cafes").send();
    expect(body).toBeInstanceOf(Array);
  });

  //   it("404 al intentar eliminar un café no existente", async () => {
  //     const response = await request(server).delete("/cafes/:id").send();
  //     const status = response.statusCode;
  //     expect(status).toBe(404);
  //   });

  it("Agregando un nuevo Cafe.", async () => {
    const id = Math.floor(Math.random() * 999);
    const nuevoCafe = { id, nombre: "Nuevo Cafe" };
    const { body } = await request(server).post("/cafes").send(nuevoCafe);
    expect(body).toContainEqual(nuevoCafe);
  });

  it("Verificando producto que no existe", async () => {
    const cafe = { id: 7, nombre: "Expresso" };
    const { statusCode, body } = await request(server).put("/cafes").send(cafe);
    expect(statusCode).toBe(400);
    expect(body.message).toBe(
      "El id del parámetro no coincide con el id del café recibido"
    );
  });
});
