export type Person = {
    foto: any
    picture: {
     thumbnail: string
    }
    name: {
     last: string
     first: string
    }
    location: {
     country: string
     city: string
    }
  }
export type PersonType = Person[]