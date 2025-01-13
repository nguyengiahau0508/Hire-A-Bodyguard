
export function calculateExpiresAt(expiresIn: string): Date {
  const regex = /^(\d+)([smhd])$/; // Hỗ trợ giây, phút, giờ, ngày
  const match = expiresIn.match(regex);

  if (!match) {
    throw new Error('Invalid expiresIn format. Use <number>[s|m|h|d] (e.g., 1d, 2h, 30m)');
  }

  const value = parseInt(match[1], 10);
  const unit = match[2];

  let milliseconds = 0;

  switch (unit) {
    case 's':
      milliseconds = value * 1000; // giây
      break;
    case 'm':
      milliseconds = value * 60 * 1000; // phút
      break;
    case 'h':
      milliseconds = value * 60 * 60 * 1000; // giờ
      break;
    case 'd':
      milliseconds = value * 24 * 60 * 60 * 1000; // ngày
      break;
    default:
      throw new Error('Unsupported time unit');
  }

  return new Date(Date.now() + milliseconds);
}


