const request = require("supertest");
const baseURI = "http://localhost:3000";

const requestData = {
    expenses: [
        { name: "Adriana", amount: 5.75 },
        { name: "Adriana", amount: 5.75 },
        { name: "Bao", amount: 12 },
    ],
};

const responseData = {
    total: 23.5,
    equalShare: 11.75,
    payouts: [{ owes: "Adriana", owed: "Bao", amount: 0.25 }]
}

describe("Bunk Calculator", () => {
    it("It will return the calculated expenses.", async () => {
        const res = await request(baseURI).post("/payouts").send(requestData);
        expect(res.body).toStrictEqual(responseData);
    });
});
