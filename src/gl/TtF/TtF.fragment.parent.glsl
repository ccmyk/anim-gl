precision highp float;
uniform sampler2D tMap;
uniform float uTime;
uniform float uStart;
uniform float uOut;
uniform float uMouseT;
uniform float uMouse;
varying vec2 vUv;

float ripple(float uv, float time, float prog) {
  float distance = length(uv + time * 2.0);
  return tan(distance * 1.0) * (prog * -1.85);
}

float rippleout(float uv, float time, float prog, float multi) {
  float distance = length(uv * 3.0 + time * 1.4);
  return tan(distance * 1.0) * (multi * prog);
}

void main() {
  float timer = uOut;
  float centeredy = (vUv.y - 0.5) * 2.0;
  float rippleOut = rippleout(vUv.y, timer, 1.0 - abs(timer), -0.36) * (0.1 * (1.0 - abs(timer)));
  float time2 = abs(uStart) * 2.0;
  float rippleUV = ripple(vUv.y, uStart, uTime) * (0.001 * uTime);
  float rippleUV2 = ripple(vUv.y, uMouse, uMouseT) * (0.0006 * uMouseT);

  vec2 U = vec2(vUv.x, rippleUV + rippleUV2 + vUv.y + rippleOut);
  float distor = 1.0;
  U.y += uStart * 0.1002;

  float r = texture2D(tMap, vec2(U.x * distor, U.y / distor)).r;
  float g = texture2D(tMap, vec2(U.x, U.y)).g * distor;
  float b = texture2D(tMap, vec2(U.x, U.y)).b * (distor + 1.6 * (distor - 1.0));
  float a = texture2D(tMap, vec2(U.x, U.y)).a;

  if (rippleOut * -32.0 > centeredy + timer) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  } else {
    gl_FragColor = vec4(r, g, b, a);
    gl_FragColor.a -= abs(rippleUV) * 0.5;
    gl_FragColor.a -= abs(rippleUV2) * 0.5;
  }
}
