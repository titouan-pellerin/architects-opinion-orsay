#if defined(PARTICLES)
mvPosition = modelViewMatrix * vec4(pos + aPositions, 1.0);
#endif
vFogDepthZ = - mvPosition.z;
vFogDepthLeft = - mvPosition.x + 20.;
vFogDepthRight = mvPosition.x + 20.;
vFogAnimation = - mvPosition.z;
