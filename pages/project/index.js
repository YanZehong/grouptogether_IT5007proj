import { Grid } from "@mui/material"
import ProjectCard from "../../components/ProjectCard"
import { projectsGetResponse } from "../../utils/ssrUtils"

export default function ProjectList({ projects }) {
  return (
    <Grid container spacing={3}>
      {
        projects.map(project => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={project._id}>
            <ProjectCard _id={project._id} school={project.school} code={project.code} semester={project.semester} projectName={project.projectName} studentCount={project.studentCount}/>
          </Grid>
        ))
      }
    </Grid>
  )
}

export async function getServerSideProps(context) {
  const responsedata = await projectsGetResponse()
  if (responsedata && responsedata.success) {
    return {
      props: {
        projects: responsedata.message
      }, // will be passed to the page component as props
    }
  } else {//TODO: error page
    return {
      notFound: true,
    }
  }
}
