// data yang akan di gunakan untuk edit, tambah, ataupun hapus
const TRIPS = [
  {
    title: "6D/4N Fun Tassie Vacation + Sydney",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    image:
      "https://res.cloudinary.com/dmegegwqb/image/upload/v1638670749/trip-default-dewetour/sydney_p4d1w2.jpg",
    //   cobalah lengkapi sesuai dengan kebutuhan di desain
  },
];

exports.getTrips = async (req, res) => {
  try {
    const data = TRIPS;

    res.send({});
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Internal Server error",
    });
  }
};

exports.detailTrip = async (req, res) => {
  // kode delete trip disini
};

// lanjutkan untuk add dan delete
