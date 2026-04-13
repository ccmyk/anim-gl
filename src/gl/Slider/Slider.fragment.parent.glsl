precision highp float;

uniform sampler2D tMap;

uniform float uTime;
uniform float uStart;
uniform float uHover;

varying vec2 vUv;

void main() {
  float moder = clamp(uStart * 0.5 + uHover, 0.0, 1.0);

  float cols = 16.0;
  vec2 U = vec2(vUv.x - moder * 0.2, vUv.y);
  vec2 P = vec2(cols, cols);
  vec2 C = floor(U * P) / P;

  vec2 mouse = vec2(moder, 0.0);

  float centpos = vUv.x + mouse.x;

  float cent = 1.0 - vUv.x;

  cent += -0.5;
  cent *= 2.0;

  float otro = floor(cent * P.x) / P.x;
  U.x -= otro;

  U.x += mouse.x * (otro * 0.2);
  U.x += centpos * 1.2 * (mouse.x * (otro * 0.1));

  float hov = 0.1 * uHover;
  U.x += otro + otro * hov + uHover * 0.16;

  float r = texture2D(tMap, vec2(U.x, U.y)).r;
  float g = texture2D(tMap, vec2(U.x, U.y)).g;
  float b = texture2D(tMap, vec2(U.x, U.y)).b;

  float a = texture2D(tMap, vec2(vUv.x, vUv.y)).a;

  gl_FragColor = vec4(r, g, b, a);
}
