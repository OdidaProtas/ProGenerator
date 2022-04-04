import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider"
import axios from "axios"
import CircularProgress from "@mui/material/CircularProgress"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Alert from "@mui/material/Alert"
import FormControlLabel from "@mui/material/FormControlLabel"

import Switch from "@mui/material/Switch"

export default function Builder() {

    const sampleEntity1 = {
        EntityName: "User",
        columns: [{
            key: "name",
            nullable: false,
            type: "string"
        },
        { key: "email", nullable: false, type: "string" },
        { key: "password", nullable: false, type: "string" }],
    }

    const sampleEntity2 = {
        EntityName: "Profile",
        columns: [{
            key: "col1",
            nullable: true,
            type: "string"
        }]
    }

    const getRand = () => Math.random().toString(16).substr(2, 12);


    const sample = {
        name: getRand(),
        database: "postgres",
        entities: [sampleEntity1, sampleEntity2],
        includeReact: true
    }


    const [state, setState] = React.useState(sample);

    const sampleRel = {
        entity: "Profile",
        type: "OneToOne",
        columns: [{ key: "age", nullable: false, type: "number" }, { key: "isMarried", default: false, type: "boolean" }]
    }

    const [relations, setRelations] = React.useState([{
        right: "Profile",
        type: "OneToOne",
        left: "User"
    }]);


    function addRelCol() {
        const newState = [...relations];
        newState.push(sampleRel);
        setRelations(newState);

    }

    const addOptions = () => {
        const newState = [...state.entities];
        newState.push({ ...sampleEntity2, EntityName: "", columns: sampleEntity2.columns.map(k => ({ ...k, key: "" })) });
        setState({ ...state, entities: newState });
    };

    const sampleCol = { key: "", nullable: false, type: "string" }


    const addCol = (index) => {
        const newState = [...state.entities[index].columns];
        newState.push(sampleCol);
        let newEntities = [...state.entities]
        newEntities[index].columns = newState;
        setState({ ...state, entities: newEntities });
    };

    const removeOption = (i) => {
        if (i === 0) {
            setState(sample);
            return;
        }
        const newState = [...state.entities];
        newState.splice(i, 1);
        setState({ ...state, entities: newState });
    };

    const handleChange = (e, i) => {
        const all = [...state];
        const obj = all[i];
        const newObj = { ...obj, [e.target.name]: e.target.value };
        all[i] = newObj;
        // setState(all);
    };

    const [loading, setLoading] = React.useState(false);
    const [err, setErr] = React.useState(false);
    const [success, setSuccess] = React.useState(false);


    function handleStateChange(e) {
        setState({ ...state, [e.target.name]: e.target.value })
    }



    function handleCreateApp(e) {
        e.preventDefault()
        setLoading(true)
        axios.post("https://kura-backend.herokuapp.com/generator", { ...state, relations }).then(({ data }) => {
            console.log(data)
            setLoading(false)
            setSuccess(true)
        }).catch(e => {
            console.log(e)
            setLoading(false)
            setErr(true)
        })
    }


    const handleRelChange = (e, i) => {
        let allRel = [...relations]
        allRel[i] = { ...allRel[i], [e.target.name]: e.target.value }
        setRelations(allRel)
    }


    function handleEntityNameChange(e, i) {
        let all = [...state.entities]
        all[i] = { ...all[i], [e.target.name]: e.target.value }
        setState({ ...state, entities: all })
    }



    return (
        <form onSubmit={handleCreateApp}>
            <Container sx={{ pb: 4 }} >
                <Box sx={{ textAlign: "center", bgcolor: "lightgray", pb: 2, pt: 3, mt: 12, borderRadius: "4px" }} >
                    <Stack spacing={2} >
                        <Typography variant="h2" >Generator</Typography>
                        <Divider />
                        <Typography sx={{ color: "text.secondary", }} variant="caption" >Generate an awesome, deployment-ready webservice  with TypeScript, Express and TypeORM, from a schema.Choose your favorite database.</Typography>
                    </Stack>
                </Box>
                <Stack spacing={2} >
                    <Typography sx={{ mt: 2 }}  >Step One.</Typography>
                    <Typography sx={{ color: "text.secondary" }} variant="caption"  >Choose a name for your project, and pick a database.</Typography>
                    <TextField
                        required
                        value={state?.name}
                        onChange={handleStateChange}
                        variant="outlined"
                        placeholder={`Project ID will be ${state?.name ? state.name : "ProjectName"}App `}
                        size="small" fullWidth name="name"
                        label="Project Name" />
                    <FormControl size="small" sx={{ mt: 2 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Database
                        </InputLabel>
                        <Select
                            required
                            value={"postgres"}
                            name="resource"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Database"
                            onChange={handleChange}
                        >
                            {["postgres", "mysql", "mongodb", "mariadb"]?.map((r, i) => (
                                <MenuItem key={i} value={r}>
                                    {r}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Divider sx={{ mt: 4 }} />
                <Stack spacing={2} >
                    <Typography sx={{ mt: 2 }}  >Step Two.</Typography>
                    <Typography sx={{ color: "text.secondary" }} variant="caption"  >Configure TypeORM classes and columns. Relationships are created in step 3 </Typography>
                    <Alert severity="info" >Validate columns. All Column field names must be unique</Alert>
                </Stack>
                {state?.entities?.map((s, i) => {
                    return (
                        <>
                            <Box
                                key={i}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mt: 2,
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <p>Entity # {i + 1}</p>
                                </Box>
                                <Box>
                                    <Button onClick={() => removeOption(i)}>
                                        {/* <DeleteIcon /> */}
                                        Remove Entity
                                    </Button>
                                </Box>
                            </Box>
                            <Stack spacing={3}>
                                <TextField
                                    required
                                    value={s.EntityName}
                                    onChange={(e) => handleEntityNameChange(e, i)}
                                    size="small"
                                    sx={{ mt: 2 }}
                                    label={"Entity Name"}
                                    fullWidth
                                    name="EntityName"
                                    helperText="Name of TypeORM class Entity ie User"
                                />

                                <Typography variant="body2" >Entity # {i + 1} Columns</Typography>
                                <Grid container spacing={2} >
                                    {s.columns.map((p, ind) => {

                                        function handleColChange(e) {
                                            let all = [...state.entities]
                                            all[i]["columns"][ind] = { ...all[i]["columns"][ind], [e.target.name]: e.target.value }
                                            setState({ ...state, entities: all })
                                        }

                                        return (
                                            <Grid item xs={6} sx={{ mb: 3 }} >
                                                <Stack spacing={2} >
                                                    <Typography variant="body2" >Col {ind + 1}</Typography>

                                                    <TextField name="key" onChange={handleColChange} value={p.key} required size="small" label="Field name" />
                                                    {/* <Check>isNullable</Check> */}
                                                    <FormControl required size="small" sx={{ mt: 2 }} fullWidth>
                                                        <InputLabel id="demo-simple-select-label">
                                                            Select column type
                                                        </InputLabel>
                                                        <Select
                                                            required
                                                            name="type"
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={p.type}
                                                            label="Select column type"
                                                            onChange={handleColChange}
                                                        >
                                                            {["string", "number", "boolean"]?.map((r, i) => (
                                                                <MenuItem key={i} value={r}>
                                                                    {r}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <TextField onChange={handleChange} value={s.default} size="small" label="Default value" />
                                                </Stack>

                                            </Grid>


                                        )
                                    })}
                                    <Grid item xs={6} sx={{ mb: 3, minHeight: "36vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                                        <Button onClick={() => addCol(i)} >Add another column</Button>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </>
                    );
                })}
                <Box sx={{ mt: 2 }} >
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ textAlign: "center" }} >
                        <Button onClick={addOptions} >Add another entity</Button>
                    </Box>
                    <Stack spacing={2} >
                        <Typography sx={{ mt: 2 }}  >Step Three.</Typography>
                        <Typography sx={{ color: "text.secondary" }} variant="caption"  >Define the relationships. The left side owns the relationship</Typography>
                        <Alert severity="info" >All relationships must be added here. You can modify later in the generated source code</Alert>
                    </Stack>
                    <Stack spacing={3} >

                        {relations.map((p, i) => {
                            return (
                                <div key={i}>
                                    <FormControl required size="small" sx={{ mt: 2 }} fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Select relationship type
                                        </InputLabel>
                                        <Select
                                            name="type"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={p.type}
                                            label="Select relationship type"
                                            onChange={(e) => handleRelChange(e, i)}
                                        >
                                            {["OneToOne", "OneToMany", "ManyToOne", "ManyToMany"]?.map((r, i) => (
                                                <MenuItem key={i} value={r}>
                                                    {r}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Grid container spacing={2} >
                                        <Grid item xs >
                                            <FormControl required size="small" sx={{ mt: 2 }} fullWidth>
                                                <InputLabel id="demo-simple-select-label">
                                                    Left
                                                </InputLabel>
                                                <Select
                                                    name="left"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={p.left}
                                                    label="Left"
                                                    onChange={(e) => handleRelChange(e, i)}
                                                >
                                                    {state?.entities.map(s => s.EntityName)?.map((r, i) => (
                                                        <MenuItem key={i} value={r}>
                                                            {r}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs >
                                            <FormControl required size="small" sx={{ mt: 2 }} fullWidth>
                                                <InputLabel id="demo-simple-select-label">
                                                    Right
                                                </InputLabel>
                                                <Select
                                                    name="right"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={p.right}
                                                    label="Right"
                                                    onChange={(e) => handleRelChange(e, i)}                                                >
                                                    {(state?.entities.map(s => s.EntityName))?.map((r, i) => (
                                                        <MenuItem key={i} value={r}>
                                                            {r}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ mt: 3 }} />
                                </div>


                            )
                        })}

                    </Stack>

                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ textAlign: "center" }} >
                        <Button onClick={addRelCol} >  Add another relationship</Button>
                    </Box>
                    <Box sx={{ my: 2 }} >
                        {success && (
                            <Alert>Your project is now ready for download.</Alert>
                        )}
                        {err && (
                            <Alert severity="error" > An error occured during project creation.</Alert>
                        )}
                    </Box>
                    <FormControlLabel
                        control={<Switch checked={state?.includeReact} onChange={() => setState({ ...state, includeReact: !state?.includeReact })} defaultChecked />}
                        label="Include React.js Frontend (Experimental)"
                    />
                    <Box sx={{ mb: 4, textAlign: "center", mt: 6 }} >
                        <Button href={success ? `https://kura-backend.herokuapp.com/project/${state.name}` : ""} onClick={(loading || success) ? () => { } : handleCreateApp} startIcon={loading ? <CircularProgress size={20} color="success" /> : null} color={loading ? "warning" : success ? "success" : "primary"} disableElevation variant="contained" >{success ? "Download" : loading ? "Generating Project" : "Run Generator"}</Button>
                    </Box>

                </Box>
            </Container >
        </form>

    );
}
