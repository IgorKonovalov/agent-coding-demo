export function getAABB(entity) {
  const pos = entity.mesh.position;
  const hw = entity.width / 2;
  const hh = entity.height / 2;
  return {
    left: pos.x - hw,
    right: pos.x + hw,
    bottom: pos.y - hh,
    top: pos.y + hh,
  };
}

export function overlaps(a, b) {
  return a.left < b.right && a.right > b.left && a.bottom < b.top && a.top > b.bottom;
}

export function resolveStaticCollision(entity, platform) {
  const a = getAABB(entity);
  const b = getAABB(platform);

  if (!overlaps(a, b)) return null;

  const overlapLeft = a.right - b.left;
  const overlapRight = b.right - a.left;
  const overlapBottom = a.top - b.bottom;
  const overlapTop = b.top - a.bottom;

  const min = Math.min(overlapLeft, overlapRight, overlapBottom, overlapTop);

  if (min === overlapTop) {
    entity.mesh.position.y = b.top + entity.height / 2;
    entity.velocity.y = 0;
    entity.isGrounded = true;
    return 'top';
  } else if (min === overlapBottom) {
    entity.mesh.position.y = b.bottom - entity.height / 2;
    entity.velocity.y = 0;
    return 'bottom';
  } else if (min === overlapLeft) {
    entity.mesh.position.x = b.left - entity.width / 2;
    entity.velocity.x = 0;
    return 'left';
  } else {
    entity.mesh.position.x = b.right + entity.width / 2;
    entity.velocity.x = 0;
    return 'right';
  }
}

export function isStompingFrom(above, below) {
  const a = getAABB(above);
  const b = getAABB(below);
  if (!overlaps(a, b)) return false;
  const bMidY = (b.top + b.bottom) / 2;
  return above.velocity.y < 0 && a.bottom < b.top && a.bottom > bMidY;
}
