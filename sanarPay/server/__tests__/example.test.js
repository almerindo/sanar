function soma(a, b) {
  return a + b;
}

test('Se eu criar um cliente, deve ser criado no multipagG', () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
