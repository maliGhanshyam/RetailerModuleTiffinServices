export const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
    //   weekday: "long",
      year: "numeric",
      month: "long", // "November"
      day: "numeric", 
    //   hour: "2-digit", 
    //   minute: "2-digit", 
    //   second: "2-digit", 
    //   hour12: true,
    });
  };
  