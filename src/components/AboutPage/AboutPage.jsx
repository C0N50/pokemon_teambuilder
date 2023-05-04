import React from "react";
import "./AboutPage.css";

import { useHistory } from "react-router-dom";

//MUI Components
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

// The About Page displays a tutorial to the user guiding them through comprehensive usage of the app.
function AboutPage() {
  const onLogin = (event) => {
    history.push("/login");
  };

  const pikachuImageURL = `https://img.pokemondb.net/artwork/large/pikachu.jpg`;
  const electric = "./Types/ElectricIC_SV.png";
  const electricMove = `./Background-Type/Electric_Background.png`;
  const normalMove = `./Background-Type/Normal_Background.png`;
  const waterMove = `./Background-Type/Water_Background.png`;
  const darkMove = `/Background-Type/Dark_Background.png`;

  const history = useHistory();

  return (
    <>
      <h1 className="about-page-title">How To Use Pokemon Team Builder</h1>

      <div className="about-page-style-container">
        <div>
          <p className="paragraph">
            Welcome to the Pokemon Team Builder application! The Pokemon Team
            Builder app is designed to house competitive resources in a
            comprehensive application to provide one stop for learning, team
            building, and analytics. This help page is written as a brief
            tutorial and quickstart guide to the core functions and features of
            the team builder application.
          </p>

          <p className="paragraph">
            {" "}
            To use the Pokemon Team Builder application you must first register
            with a user name and password. Although there are technically no
            password requirements, it is advised to choose a password of at
            least 8 characters and containing a mix of capital & lowercase
            letters, numbers, and symbols.
          </p>

          <RegisterForm />
        </div>
      </div>

      <div className="about-page-login-button">
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>
      </div>

      <div className="about-page-style-container">
        <div id="landing-page-description">
          <p>After Logging in you will be directed to a landing page.</p>
          <p>The landing page contains a list of all the teams you create.</p>
          <p>To Create a team press the Create New Team button.</p>
        </div>
      </div>

      <div className="about-page-login-button">
        <Button variant="contained">Create New Team</Button>
      </div>

      <div className="about-page-style-container">
        <div id="landing-page-description">
          <p>
            The Create New Team Button fetches a list of pokemon to be added to
            your team.
          </p>
        </div>
      </div>

      <div className="pikachu-exaple-container">
        <Card
          sx={{
            boxShadow: 2,
            width: 400,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Pikachu
            </Typography>
            <CardMedia
              sx={{
                height: 100,
                width: "100%",
                backgroundSize: "contain",
              }}
              image={pikachuImageURL}
            />
          </CardContent>
          <CardActions>
            <Button variant="contained" size="medium">
              Add
            </Button>
            <Button size="small">Details</Button>
          </CardActions>
        </Card>
      </div>

      <div className="about-page-style-container">
        <div id="landing-page-description">
          <p>
            After Adding a Pokemon to the team it will appear as a card on the
            team
          </p>
          <p>Clear team button removes all pokemon from the current team</p>
          <p>Save Team button permanently saves team.</p>
          <p>Edit buton opens the edit pokemon page & move list.</p>
        </div>
      </div>

      <>
        <section className="about-selected-list-style">
          <Button variant="contained">
            Clear Team
          </Button>

          <Card
            className="selected-card-style"
            sx={{
              width: 400,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Pikachu
              </Typography>
              <div className="type-flex-style">
                <CardMedia
                  className="pokemon-image-style"
                  sx={{
                    height: 20,
                    width: "45%",
                    backgroundSize: "contain",
                  }}
                  image={electric}
                />
              </div>
              <CardMedia
                className="pokemon-image-style"
                sx={{
                  height: 100,
                  width: "100%",
                  backgroundSize: "contain",
                }}
                image={pikachuImageURL}
              />

              <div className="move-flex-style">
                <Typography className="Move-1" variant="caption">
                  <div className="move-body">
                    {/*         <>
                                    <div>{capitalize(pokemon.selectedAttacks[0].name)}</div>
                                </> */}
                    <div></div>
                  </div>
                </Typography>
                <Typography className="Move-2" variant="caption">
                  <div className="move-body">
                      {/* <>
                        <div>{capitalize(pokemon.selectedAttacks[1].name)}</div>
                      </> */}
                      <div></div>
                  </div>
                </Typography>
                <Typography className="Move-3" variant="caption">
                  <div className="move-body">
                      {/* <>
                        <div>{capitalize(pokemon.selectedAttacks[2].name)}</div>
                      </> */}
                      <div></div>

                  </div>
                </Typography>
                <Typography className="Move-4" variant="caption">
                  <div className="move-body">
                      {/* <>
                        <div>{capitalize(pokemon.selectedAttacks[3].name)}</div>
                      </> */}
                      <div></div>
                  </div>
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <div className="card-action-button-style">
                <Button
                  variant="contained"
                  size="small"
                >
                  Edit
                </Button>
                <Button size="small">
                  Delete
                </Button>
              </div>
            </CardActions>
          </Card>

              {/* <Button onClick={updateTeam} variant="contained">
                Update Team
              </Button> */}

              <Button variant="contained">
                Save Team
              </Button>

        </section>
      </>

      <div className="about-page-style-container">
        <div id="landing-page-description">
          <p>Edit buton opens the edit pokemon page & move list.</p>
        </div>
      </div>

      <div align="center">
        <Card
          sx={{
            width: 400,
            boxShadow: 2,
          }}
        >
          <CardContent>
            <Typography variant="h4" component="div">
              Volt-tackle
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" size="medium">
              Add
            </Button>
            <Button size="small">Details</Button>
          </CardActions>
        </Card>
      </div>

      <div className="about-page-style-container">
        <div id="landing-page-description">
          <p>After Adding a move it will appear on the pokemon edit card</p>
          <p>
            Click Save to store the pokemons moves and return to the team edit
            page.
          </p>
        </div>
      </div>

      <div align="center">
        <Card
          sx={{
            width: "75%",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <div className="type-flex-style-edit">
              <Typography variant="h4" component="div">
                Pikachu
              </Typography>

              <CardMedia
                className="pokemon-type-image-style"
                sx={{
                  height: 20,
                  width: "20%",
                  backgroundSize: "contain",
                }}
                image={electric}
              />
            </div>

            <div className="image-stats-misc-grid">
              <CardMedia
                className="pokemon-image-style"
                sx={{
                  height: 150,
                  width: "100%",
                  backgroundSize: "contain",
                }}
                image={pikachuImageURL}
              />

              <Typography className="hp" variant="body1">
                <div className="stat-body">
                  <div>HP:</div>
                  <div>35</div>
                </div>
              </Typography>

              <Typography className="attack" variant="body1">
                <div className="stat-body">
                  Attack
                  <div>55</div>
                </div>
              </Typography>

              <Typography className="defense" variant="body1">
                <div className="stat-body">
                  Defense
                  <div>40</div>
                </div>
              </Typography>

              <Typography className="special-attack" variant="body1">
                <div className="stat-body">
                  Special Attack
                  <div>50</div>
                </div>
              </Typography>

              <Typography className="special-defense" variant="body1">
                <div className="stat-body">
                  Special Defense
                  <div>50</div>
                </div>
              </Typography>

              <Typography className="speed" variant="body1">
                <div className="stat-body">
                  Speed
                  <div>90</div>
                </div>
              </Typography>
            </div>

            <div className="move-grid-style">
              <Typography className="Move-1" variant="h6">
                <div className="move-body">
                  <>
                    <div>Volt-tackle</div>
                    <div>
                      <Button size="small">Remove</Button>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className="Move-2" variant="h6">
                <div className="move-body">
                  <>
                    <div>Thunder-wave</div>
                    <div>
                      <Button size="small">Remove</Button>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className="Move-3" variant="h6">
                <div className="move-body">
                  <>
                    <div>Surf</div>
                    <div>
                      <Button onClick={() => handleRemoveMove(2)} size="small">
                        Remove
                      </Button>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className="Move-4" variant="h6">
                <div className="move-body">
                  <>
                    <div>Knock-off</div>
                    <div>
                      <Button size="small">Remove</Button>
                    </div>
                  </>
                </div>
              </Typography>
            </div>
          </CardContent>
          <CardActions>
            <div className="button-flex">
              <Button>Cancel</Button>
              <Button variant={"contained"}>Save</Button>
            </div>
          </CardActions>
        </Card>
      </div>

      <div className="about-page-style-container">
        <div id="landing-page-description">
          <p>
            Each pokemon's add button creates a pokemon team list that can hold up to a full
            team of six pokemon.
          </p>
        </div>
      </div>

      <div className="pikachu-exaple-container">
        <Card
          sx={{
            width: 400,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              Pikachu
            </Typography>

            <div className="type-flex-style">
              <CardMedia
                className="pokemon-image-style"
                sx={{
                  height: 20,
                  width: "45%",
                  backgroundSize: "contain",
                }}
                image={electric}
              />
            </div>
            <CardMedia
              className="pokemon-image-style"
              sx={{
                height: 100,
                width: "100%",
                backgroundSize: "contain",
              }}
              image={pikachuImageURL}
            />

            <div className="move-flex-style">
              <Typography className="Move-1" variant="caption">
                <div className="move-body">
                  <>
                    <div className="move-container">
                      <div>
                        <img width="100%" src={electricMove} />
                      </div>
                      <div className="move-text">Volt-tackle</div>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className="Move-2" variant="caption">
                <div className="move-body">
                  <>
                    <div className="move-container">
                      <div>
                        <img width="100%" src={normalMove} />
                      </div>
                      <div className="move-text">Extreme-speed</div>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className="Move-3" variant="caption">
                <div className="move-body">
                  <>
                    <div className="move-container">
                      <div>
                        <img width="100%" src={waterMove} />
                      </div>
                      <div className="move-text">Surf</div>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className="Move-4" variant="caption">
                <div className="move-body">
                  <>
                    <div className="move-container">
                      <div>
                        <img width="100%" src={darkMove} />
                      </div>
                      <div className="move-text">Knock-off</div>
                    </div>
                  </>
                </div>
              </Typography>
            </div>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </div>
    </>
  );
}

export default AboutPage;
