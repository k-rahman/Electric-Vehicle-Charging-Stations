export const convertTime = timeElapsed => ({
  hrs: Math.floor((timeElapsed / (1000 * 60 * 60)) % 24),
  mins: Math.floor((timeElapsed / 1000 / 60) % 60),
  secs: Math.floor((timeElapsed / 1000) % 60),
})


export const convertDateTime = dateTime => {
  return new Date(dateTime.slice(0, 10).replace('T', ' ')).toLocaleDateString('FI');
}
