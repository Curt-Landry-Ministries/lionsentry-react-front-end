export const useDevotional = (devotional: Devotional) => {
  const devotionalDate = devotional && new Date(devotional.dateTimeCreated);
  const todayDate = new Date();

  const isTodayDevotional =
    devotionalDate &&
    devotionalDate.setHours(0, 0, 0, 0) === todayDate.setHours(0, 0, 0, 0);

  const isNewFormat =
    devotional &&
    (devotional.insight ||
      devotional.declaration ||
      devotional.life_application ||
      devotional.prayer);

  const devotionalHeader: { [key: string]: any } = {
    insight: {
      title: "Insight",
      icon: "/icons/star-shine.svg",
    },
    life_application: {
      title: "Action",
      icon: "/icons/walk.svg",
    },
    declaration: {
      title: "Declaration",
      icon: "/icons/declare.svg",
    },
    prayer: {
      title: "Prayer",
      icon: "/icons/pray.svg",
    },
  };

  return { devotionalDate, isTodayDevotional, isNewFormat, devotionalHeader };
};
