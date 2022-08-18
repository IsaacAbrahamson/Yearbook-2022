### build.js

This script is used to build the server.

This is mapped to `npm run build`.

### search.py

Used in AWS Lambda to create the website search API.

Request body:
```javascript
{
    year: int,     // Year of search being made. Necessary for searching the correct data.
    query: string, // Search query.
}
```
Response body:
```javascript
{
    people: {
        {
            image: string,          // URL to image to display. Append person.portrait to "/portraits/" for almost every image.
                                    // Note: Use a falsy value if person.portrait is falsy.
            name: string,           // Full name of person. Use person.full_name.
            major: string,          // Person's major or division. Use person.major.
            classification: string, // Person's classification. Use person.classification.
            quote: string,          // Special quote for special people. Use person.quote, if present, else None (or don't include at all).
        }[] // Note: This is an array
    },
    groups: {
        {
            image: string,  // URL of image to display. Use group.pictures[0].
                            // Note: Use a falsy value if group.pictures is empty/falsy.
            name: string,   // Name of group. Use group.name.
            url: string,    // URL of group's page. Using group.slug, return a string of the form: "groups/{slug}.html"
        }[] // Note: This is an array
    },
}
```

###  sort_group_names.py

Used to sort subgroups.
