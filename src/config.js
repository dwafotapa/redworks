const config = {
  cameraMakes: {
    "1": { id: "1", name: "Canon" },
    "2": { id: "2", name: "FUJIFILM", aliases: ["FUJI PHOTO FILM CO., LTD."] },
    "3": { id: "3", name: "LEICA" },
    "4": { id: "4", name: "NIKON CORPORATION" },
    "5": { id: "5", name: "Panasonic" }
  },
  cameraModels: {
    "1": { id: "1", name: "Canon EOS 20D", cameraMakeId: "1" },
    "2": { id: "2", name: "Canon EOS 400D DIGITAL", cameraMakeId: "1" },
    "3": { id: "3", name: "D-LUX 3", cameraMakeId: "3" },
    "4": { id: "4", name: "DMC-FZ30", cameraMakeId: "5" },
    "5": { id: "5", name: "FinePix S6500fd", cameraMakeId: "2" },
    "6": { id: "6", name: "NIKON D80", cameraMakeId: "4" },
    "7": { id: "7", name: "SLP1000SE", cameraMakeId: "2" }
  }
};

export default config;