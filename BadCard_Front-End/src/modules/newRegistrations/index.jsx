import React from 'react';
import Layout from 'components/Layout';

import './styles.scss';

const NewRegistrations = () => {
  return (
    <Layout>
      <div className='row justify-content-center'>
        <div className='table-wrap'>
          <table className='table table-responsive-xl'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Username</th>
                <th>Status</th>
                <th>User Role</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className='alert' role='alert'>
                <td className='d-flex align-items-center'>
                  <div
                    className='img'
                    style={{
                      backgroundImage:
                        'url(https://preview.colorlib.com/theme/bootstrap/table-05/images/xperson_1.jpg.pagespeed.ic.a2MnMHMs44.webp)',
                    }}
                  ></div>
                  <div className='pl-3 email'>
                    <span>markotto@email.com</span>
                    <span>Added: 01/03/2020</span>
                  </div>
                </td>
                <td>Markotto89</td>
                <td className='status'>
                  <span className='pending'>Pending</span>
                </td>
                <td className='role'>
                  <span className='admin'>Admin</span>
                </td>
                <td>
                  <button
                    type='button'
                    className='accept'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-check'></i>
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-trash'></i>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className='alert' role='alert'>
                <td className='d-flex align-items-center'>
                  <div
                    className='img'
                    style={{
                      backgroundImage:
                        'url(https://preview.colorlib.com/theme/bootstrap/table-05/images/xperson_1.jpg.pagespeed.ic.a2MnMHMs44.webp)',
                    }}
                  ></div>
                  <div className='pl-3 email'>
                    <span>jacobthornton@email.com</span>
                    <span>Added: 01/03/2020</span>
                  </div>
                </td>
                <td>Jacobthornton</td>
                <td className='status'>
                  <span className='pending'>Pending</span>
                </td>
                <td className='role'>
                  <span className='admin'>Admin</span>
                </td>
                <td>
                  <button
                    type='button'
                    className='accept'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-check'></i>
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-trash'></i>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className='alert' role='alert'>
                <td className='d-flex align-items-center'>
                  <div
                    className='img'
                    style={{
                      backgroundImage:
                        'url(https://preview.colorlib.com/theme/bootstrap/table-05/images/xperson_1.jpg.pagespeed.ic.a2MnMHMs44.webp)',
                    }}
                  ></div>
                  <div className='pl-3 email'>
                    <span>larrybird@email.com</span>
                    <span>Added: 01/03/2020</span>
                  </div>
                </td>
                <td>Larry_bird</td>
                <td className='status'>
                  <span className='pending'>Pending</span>
                </td>
                <td className='role'>
                  <span className='admin'>Admin</span>
                </td>
                <td>
                  <button
                    type='button'
                    className='accept'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-check'></i>
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-trash'></i>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className='alert' role='alert'>
                <td className='d-flex align-items-center'>
                  <div
                    className='img'
                    style={{
                      backgroundImage:
                        'url(https://preview.colorlib.com/theme/bootstrap/table-05/images/xperson_1.jpg.pagespeed.ic.a2MnMHMs44.webp)',
                    }}
                  ></div>
                  <div className='pl-3 email'>
                    <span>johndoe@email.com</span>
                    <span>Added: 01/03/2020</span>
                  </div>
                </td>
                <td>Johndoe1990</td>
                <td className='status'>
                  <span className='pending'>Pending</span>
                </td>
                <td className='role'>
                  <span className='admin'>Admin</span>
                </td>
                <td>
                  <button
                    type='button'
                    className='accept'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-check'></i>
                    </span>
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-trash'></i>
                    </span>
                  </button>
                </td>
              </tr>
              <tr className='alert' role='alert'>
                <td className='d-flex align-items-center border-bottom-0'>
                  <div
                    className='img'
                    style={{
                      backgroundImage:
                        'url(https://preview.colorlib.com/theme/bootstrap/table-05/images/xperson_1.jpg.pagespeed.ic.a2MnMHMs44.webp)',
                    }}
                  ></div>
                  <div className='pl-3 email'>
                    <span>garybird@email.com</span>
                    <span>Added: 01/03/2020</span>
                  </div>
                </td>
                <td className='border-bottom-0'>Garybird_2020</td>
                <td className='status'>
                  <span className='pending'>Pending</span>
                </td>
                <td className='role'>
                  <span className='admin'>Admin</span>
                </td>
                <td>
                  <button
                    type='button'
                    className='accept'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-check'></i>
                    </span>
                  </button>
                </td>
                <td className='border-bottom-0'>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>
                      <i className='fas fa-trash'></i>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default NewRegistrations;
