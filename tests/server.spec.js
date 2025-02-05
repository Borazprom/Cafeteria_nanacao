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

  //   it("Obteniendo 400 al actualizar cafe con id desconocido", async () => {
  //     const response = await request(server).put("/cafes/:id").send();
  //     const status = response.statusCode;
  //     expect(status).toBe(400);
  //   });
});
