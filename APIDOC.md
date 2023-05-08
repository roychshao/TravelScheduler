# TravelScheduler api doc

## User
#### POST /api/user/register  

request
```
body: {
    username,
    email
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        user_id,
    }
}
```

## Travel
#### GET /api/travel

request
```
body: {
    user_id
}
```

response
```
body: {
    success: true,
    message: ""
    data: {
        travels: [
            travel_id,
            travel_name,
            travel_date,
            travel_peoplenum,
            travel_discription,
            travel_done,
            group_id,
        ]
    }
}
```

#### GET /api/travel/spot

request
```
body: {
    travel_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        travel_id,
        travel_name,
        travel_date,
        travel_peoplenum,
        travel_discription,
        travel_done,
        group_id,
        days: [
            spots: [
                spot: {
                    spot_id,
                    spot_name,
                    spot_location,
                    spot_rank,
                    spot_openhour,
                    spot_discription,
                    spot_arrive_time,
                    spot_start_time,
                    spot_transportation,  // "" if terminus
                    spot_tag_id,
                    spot_tag_name,
                    spot_tag_color,
                }
            ]
        ]
    }
}
```

#### POST /api/travel/create

request
```
body: {
    user_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_discription,
    travel_done,
    group_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/travel/delete

request
```
body: {
    travel_id
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/travel/edit

request
```
body: {
    travel_id,
    travel_name,
    travel_date,
    travel_peoplenum,
    travel_discription,
    travel_done,
    group_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Spot
#### GET /api/spot

request
```
body: {
    user_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        spots: [
            spot: {
                spot_id,
                spot_name,
                spot_location,
                spot_rank,
                spot_openhour,
                spot_star,
                spot_discription,
                spot_tag_id,
                spot_tag_name,
                spot_tag_color,
            }
        ]
    }
}
```

#### POST /api/spot/create

request
```
body: {
    user_id,
    spot_name,
    spot_location,
    spot_rank,
    spot_openhour,
    spot_discription,
    spot_tag_id,
    spot_tag_name,
    spot_tag_color,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/spot/edit

request
```
body: {
    spot_star,
    spot_discription,
    spot_tag_name,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/spot/delete

request
```
body: {
    spot_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Group
#### GET /api/group/

request
```
body: {
    user_id
}
```

response
```
body: {
    success: true,
    message: "",
    data: {
        groups: [
            group: {
                group_id,
                group_name.
                group_discription,
                group_peoplenum,
                members: [
                    member: {
                        username,
                        email
                    }
                ]
            }
        ]
    }
}
```

#### POST /api/group/create

request
```
body: {
    group_name,
    group_discription,
    group_peoplenum,    // initially 1
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/group/join

request
```
body: {
    group_id,
    user_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/group/kick

request
```
body: {
    group_id,
    user_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### PUT /api/group/edit

request
```
body: {
    group_id,
    group_name,
    group_discription,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

#### DELETE /api/group/delete

request
```
body: {
    group_id,
}
```

response
```
body: {
    success: true,
    message: "",
    data: {}
}
```

## Error return

response
```
body: {
    success: false,
    message: "",
    data: {}
}
```
