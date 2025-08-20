import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function Appbar({userInfo}){
    const { showToast } = useToast();
    const navigate = useNavigate();

    function handleLogout(){
        localStorage.clear();
        showToast("User logged out successfully", "success");
        navigate("/signin");
        return; // Stops the further execution
    }

    return <div className="flex justify-between items-center p-6 border-b-2 ">
        <div className=" font-bold text-3xl">
            Payments App
        </div>
        <div className="flex gap-2 justify-center items-center font-normal text-lg">
            <div className="bg-gray-400/[0.8] flex justify-center items-center py-auto rounded-full size-12">
                {userInfo.firstName[0]?.toUpperCase() || ""}
            </div>
            
            <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
            <div>
                <div className='text-xl cursor-pointer' {...bindTrigger(popupState)}>
                    {userInfo.firstName} {userInfo.lastName} 
                    <ArrowDropDownIcon />
                </div>
            <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            >
            <div className='flex flex-col w-60 h-28 p-6 text-lg justify-center gap-2 cursor-pointer'>
                <div className='flex items-center gap-2 hover:underline' onClick={handleLogout}>
                    <LogoutIcon /> Logout
                </div>
                <div className='flex items-center gap-2 hover:underline'>
                    <PersonOutlineIcon /> Edit Profile
                </div>
            </div>
          </Popover>
        </div>
      )}
    </PopupState>
        </div>
    </div>
}