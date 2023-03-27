import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';





import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";



import AnalyzeTeam from '../AnalyzeTeam/AnalyzeTeam';
import AnalyzeTeamItem from '../AnalyzeTeamItem/AnalyzeTeamItem';

import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';
import TeamList from '../TeamList/TeamList';
import AnalyzeTeamMenu from '../AnalyzeTeamMenu/AnalyzeTeamMenu';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './DefensiveTypeChart.css'

function DefensiveTypeChart({ analysisTeam }) {

    const capitalize = (lowercase) => {
        let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        return capital;
    }

    // console.log('analysis team', analysisTeam);

    const typeReducer = useSelector((store) => store.typeList)

    const typeArray = typeReducer.map((type) => {
        return type.name;
    }).sort();

    const damageRelationArray = analysisTeam.map((pokemon) => {
        return pokemon.typeData;
    })

    // console.log('damageRelationArray', damageRelationArray);

    // console.log('typeArray', typeArray);

    let calcRows = [];

    for (let typeName of typeArray) {
        let rowObject = { name: typeName };
        for (let pokemon of damageRelationArray) {
            let modifier = 1;
            for (let type of pokemon) {
                for (let weakness of type.damage_relations.double_damage_from) {
                    if (weakness && weakness.name === typeName) {
                        // console.log('weakness found!', weakness.name);
                        modifier *= 2;
                    }
                }
                for (let resistance of type.damage_relations.half_damage_from) {
                    if (resistance && resistance.name === typeName) {
                        // console.log('resistance found!', resistance.name);
                        modifier /= 2;
                    }
                }
                for (let immunity of type.damage_relations.no_damage_from) {
                    if (immunity && immunity.name === typeName) {
                        // console.log('immunity found!', immunity.name);
                        modifier *= 0;
                    }
                }

            }
            // console.log('type modifier:', typeName, modifier);
            rowObject['pokemon' + damageRelationArray.indexOf(pokemon)] = modifier
        }
        calcRows.push(rowObject);
    }

    // console.log('calcRows', calcRows);


    let calcTotalRows = [];

    for (let row of calcRows) {
        // console.log('row', row);
        let resistanceCount = 0;
        let weaknessCount = 0;

        switch (row.pokemon0) {
            case .25: resistanceCount++
                break;
            case .5: resistanceCount++
                break;
            case 0: resistanceCount++
                break;
            case 2: weaknessCount++
                break;
            case 4: weaknessCount++
                break;
            default:
                break;
        }

        switch (row.pokemon1) {
            case .25: resistanceCount++
                break;
            case .5: resistanceCount++
                break;
            case 0: resistanceCount++
                break;
            case 2: weaknessCount++
                break;
            case 4: weaknessCount++
                break;
            default:
                break;
        }


        switch (row.pokemon2) {
            case .25: resistanceCount++
                break;
            case .5: resistanceCount++
                break;
            case 0: resistanceCount++
                break;
            case 2: weaknessCount++
                break;
            case 4: weaknessCount++
                break;
            default:
                break;
        }

        switch (row.pokemon3) {
            case .25: resistanceCount++
                break;
            case .5: resistanceCount++
                break;
            case 0: resistanceCount++
                break;
            case 2: weaknessCount++
                break;
            case 4: weaknessCount++
                break;
            default:
                break;
        }

        switch (row.pokemon4) {
            case .25: resistanceCount++
                break;
            case .5: resistanceCount++
                break;
            case 0: resistanceCount++
                break;
            case 2: weaknessCount++
                break;
            case 4: weaknessCount++
                break;
            default:
                break;
        }

        switch (row.pokemon5) {
            case .25: resistanceCount++
                break;
            case .5: resistanceCount++
                break;
            case 0: resistanceCount++
                break;
            case 2: weaknessCount++
                break;
            case 4: weaknessCount++
                break;
            default:
                break;
        }

        let rowObject = {
            name: row.name,
            weaknessTotal: weaknessCount,
            resistanceTotal: resistanceCount
        }

        calcTotalRows.push(rowObject)
    }



    const totalRows = [
        {
            type: 'Bug',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Dark',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Dragon',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Electric',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Fairy',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Fighting',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Fire',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Flying',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Ghost',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Grass',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Ground',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Ice',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Normal',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Poison',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Pyschic',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Rock',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Steel',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Water',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
        {
            type: 'Total',
            weaknessTotal: 1,
            resistanceTotal: 3,
        },
    ];


    return (
        <>
            <div className='table-grid-style'>
                <TableContainer className='defensive-types-table' component={Paper}>
                    <Table size="small" aria-label='simple-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '.75em' }}>Move Type</TableCell>
                                {analysisTeam[0] ?
                                    <TableCell sx={{ fontSize: '.75em' }}>{capitalize(analysisTeam[0]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[1] ?
                                    <TableCell sx={{ fontSize: '.75em' }}>{capitalize(analysisTeam[1]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[2] ?
                                    <TableCell sx={{ fontSize: '.75em' }}>{capitalize(analysisTeam[2]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[3] ?
                                    <TableCell sx={{ fontSize: '.75em' }}>{capitalize(analysisTeam[3]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[4] ?
                                    <TableCell sx={{ fontSize: '.75em' }}>{capitalize(analysisTeam[4]?.name)}</TableCell> : <></>
                                }
                                {analysisTeam[5] ?
                                    <TableCell sx={{ fontSize: '.75em' }}>{capitalize(analysisTeam[5]?.name)}</TableCell> : <></>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calcRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img width='100%' src={capitalize(row.name) + 'IC_SV.png'} />
                                    </TableCell>
                                    {analysisTeam[0] ?
                                        <TableCell align="left">
                                            <img width='80%' src={row.pokemon0 + '.png'} />
                                        </TableCell> : <></>
                                    }
                                    {analysisTeam[1] ?
                                        <TableCell align="left">
                                            <img width='80%' src={row.pokemon1 + '.png'} />
                                        </TableCell> : <></>
                                    }
                                    {analysisTeam[2] ?
                                        <TableCell align="left">
                                            <img width='80%' src={row.pokemon2 + '.png'} />
                                        </TableCell> : <></>
                                    }
                                    {analysisTeam[3] ?
                                        <TableCell align="left">
                                            <img width='80%' src={row.pokemon3 + '.png'} />
                                        </TableCell> : <></>
                                    }
                                    {analysisTeam[4] ?
                                        <TableCell align="left">
                                            <img width='80%' src={row.pokemon4 + '.png'} />
                                        </TableCell> : <></>
                                    }
                                    {analysisTeam[5] ?
                                        <TableCell align="left">
                                            <img width='80%' src={row.pokemon5 + '.png'} />
                                        </TableCell> : <></>}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>


                <TableContainer className='totals-table' component={Paper}>
                    <Table size="small" aria-label='total-table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>Weaknesses</TableCell>
                                <TableCell>Resistances</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {calcTotalRows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img width='80%' height="80%" src={capitalize(row.name) + 'IC_SV.png'} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <img width='60%' src={row.weaknessTotal + 'w.png'} />
                                    </TableCell>
                                    <TableCell align="left">
                                        <img width='60%' src={row.resistanceTotal + 'r.png'} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>
            </div>

        </>

    )
}

export default DefensiveTypeChart;