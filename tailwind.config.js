  module.exports = {
    "content": [ "./src/**/*.{js,jsx,ts,tsx}" ],
    "theme": {
      "extend": {
        "spacing": {
          "128": "32rem",
          "144": "36rem"
        },
        "animation": {
          "fade-in": "fade-in 0.4s ease-in-out forwards",
          "fade-out": "fade-out 0.4s ease-in-out forwards"
        },
        "zIndex": {
          "holder": "500000"
        }
      }
    },
    "plugins": []
  }