// material
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { Avatar, Chip, Stack, Paper } from '@material-ui/core';
// components
import { MChip } from '../../../../components/@material-extend';
//
import { Label } from '../../Block';
import React from 'react';
// ----------------------------------------------------------------------

const style = {
  p: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
};

// ----------------------------------------------------------------------

export default function ChipFilled() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack spacing={3}>
      <div>
        <Label title="Base" />
        <Paper variant="outlined" sx={style}>
          <Chip label="Basic" />
          <Chip label="Disabled" disabled />
          <Chip avatar={<Avatar>B</Avatar>} label="Clickable" onClick={handleClick} />
          <Chip
            avatar={<Avatar alt="Natacha" src="/static/mock-images/avatars/avatar_1.jpg" />}
            label="Deletable"
            onDelete={handleDelete}
          />
          <Chip icon={<FaceIcon />} label="Clickable deletable" onClick={handleClick} onDelete={handleDelete} />
          <Chip label="Custom delete icon" onClick={handleClick} onDelete={handleDelete} deleteIcon={<DoneIcon />} />
          <Chip label="Clickable Link" component="a" href="#chip" clickable />
          <Chip
            avatar={<Avatar>M</Avatar>}
            label="Primary clickable"
            clickable
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />
          <Chip icon={<FaceIcon />} label="Primary clickable" clickable color="primary" onDelete={handleDelete} deleteIcon={<DoneIcon />} />
          <Chip label="Deletable primary" onDelete={handleDelete} color="primary" />
        </Paper>
      </div>

      <div>
        <Label title="Colors" />
        <Paper variant="outlined" sx={style}>
          <MChip
            label="Default deletable"
            avatar={<Avatar alt="Natacha" src="/static/mock-images/avatars/avatar_1.jpg" />}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            clickable
            label="Default clickable"
            avatar={<Avatar alt="Natacha" src="/static/mock-images/avatars/avatar_1.jpg" />}
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            label="Primary deletable"
            avatar={<Avatar alt="Natacha" src="/static/mock-images/avatars/avatar_1.jpg" />}
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip
            clickable
            label="Primary clickable"
            avatar={<Avatar alt="Natacha" src="/static/mock-images/avatars/avatar_1.jpg" />}
            color="primary"
            onDelete={handleDelete}
            deleteIcon={<DoneIcon />}
          />

          <MChip icon={<FaceIcon />} label="Secondary deletable" onDelete={handleDelete} color="secondary" deleteIcon={<DoneIcon />} />

          <MChip
            clickable
            icon={<FaceIcon />}
            label="Secondary clickable"
            onDelete={handleDelete}
            color="secondary"
            deleteIcon={<DoneIcon />}
          />

          <MChip icon={<FaceIcon />} label="Info deletable" onDelete={handleDelete} color="info" deleteIcon={<DoneIcon />} />

          <MChip clickable icon={<FaceIcon />} label="Info clickable" onDelete={handleDelete} color="info" deleteIcon={<DoneIcon />} />

          <MChip icon={<FaceIcon />} label="Success deletable" onDelete={handleDelete} color="success" />
          <MChip clickable icon={<FaceIcon />} label="Success clickable" onDelete={handleDelete} color="success" />
          <MChip icon={<FaceIcon />} label="Warning deletable" onDelete={handleDelete} color="warning" />
          <MChip clickable icon={<FaceIcon />} label="Warning clickable" onDelete={handleDelete} color="warning" />
          <MChip icon={<FaceIcon />} label="Error deletable" onDelete={handleDelete} color="error" />
          <MChip clickable icon={<FaceIcon />} label="Error clickable" onDelete={handleDelete} color="error" />
        </Paper>
      </div>

      <div>
        <Label title="Size" />
        <Paper variant="outlined" sx={style}>
          <MChip avatar={<Avatar>M</Avatar>} label="Normal" onDelete={handleDelete} color="info" />
          <MChip size="small" avatar={<Avatar>M</Avatar>} label="Small" onDelete={handleDelete} color="info" />
        </Paper>
      </div>
    </Stack>
  );
}
