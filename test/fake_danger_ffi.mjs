export function new_fake_danger() {
  return {
    calls: {},
  };
}

export function record_call(fake, method, value) {
  if (!fake.calls[method]) {
    fake.calls[method] = [];
  }

  fake.calls[method].push(value);
}

export function calls(fake, method) {
  return fake.calls[method] ?? [];
}
