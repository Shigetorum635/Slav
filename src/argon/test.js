const argon2 = require("phc-argon2");

(async () => {
  const hash = await argon2.hash("password", {
    variant: "d",
  });
  const hash2 = await argon2.hash("password", {
    variant: "i",
  });
  const hash3 = await argon2.hash("password", {
    variant: "id",
  });
  console.table({
    argon2d: hash,
    argon2i: hash2,
    argon2id: hash3,
  });
  const match = await argon2.verify(hash, "password");
  console.log(match);
  const ids = argon2.identifiers();
  console.log(ids);
})();
