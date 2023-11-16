const Posts = [
    {
        name: "Computational APIs",
        desc: "A brief introduction to computation APIs outside of the realm of basic web-development, using Wolfram.",
        authors: [
            { name: "Matthew", img: "https://github.com/punctuations.png", link: "https://github.com/punctuations" }
        ],
        file: "/p/computational-apis",
        id: 'compapi',
        date: new Date(),
        get prefferd_image(): string {
            return this.images.static;
        },
        images: {
            static: "/articles/api_static.webp",
            dynamic: "https://www.wolframcloud.com/obj/mattsnaccc/api/moon"
        }
    },
    {
        name: "Cameras & Planes",
        desc: "An introduction to planes and vector projection through a combination of Math and Comp. Sci.",
        authors: [
            { name: "Matthew", img: "https://github.com/punctuations.png", link: "https://github.com/punctuations" }
        ],
        file: "/p/vec-projection",
        id: 'vec',
        date: new Date("Nov 11, 2023"),
        get prefferd_image(): string {
            return this.images.static;
        },
        images: {
            static: "/articles/projection_static.webp",
            dynamic: null
        }
    }
]

export default Posts;