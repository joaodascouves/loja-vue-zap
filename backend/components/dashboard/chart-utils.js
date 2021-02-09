export const lastDays = (num) => {
  const now = new Date();

  const daysOfWeek = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  const today = daysOfWeek[now.getDay()];
  const todayIndex = daysOfWeek.indexOf(today);

  const labels = ['Hoje'];

  let day = todayIndex;

  for (let i = 0; i < num; i++) {
    day -= 1;

    if (day < 0) {
      day = 6;
    }

    labels.unshift(daysOfWeek[day]);
  }

  return labels;
};
