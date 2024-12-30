import { Link, useParams } from 'react-router-dom';
import { EnrichPerson } from '../types';
import classNames from 'classnames';

type Props = {
  people: EnrichPerson[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;
  const { personSlug } = useParams();

  const isPersoninList = (slug: string | undefined) => {
    const result = people.some(person => person.slug === slug);

    return result;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={`../${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <>
                  {isPersoninList(person.mother?.slug) ? (
                    <Link
                      className="has-text-danger"
                      to={`../${person.mother?.slug}`}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )}
                </>
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <>
                  {isPersoninList(person.father?.slug) ? (
                    <Link to={`../${person.father?.slug}`}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )}
                </>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}

        {/* <tr data-cy="person">
        <td>
          <a href="#/people/philibert-haverbeke-1907">Philibert Haverbeke</a>
        </td>

        <td>m</td>
        <td>1907</td>
        <td>1997</td>

        <td>
          <a className="has-text-danger" href="#/people/emma-de-milliano-1876">
            Emma de Milliano
          </a>
        </td>

        <td>
          <a href="#/people/emile-haverbeke-1877">Emile Haverbeke</a>
        </td>
      </tr>

      <tr data-cy="person" className="has-background-warning">
        <td>
          <a href="#/people/jan-frans-van-brussel-1761">
            Jan Frans van Brussel
          </a>
        </td>

        <td>m</td>
        <td>1761</td>
        <td>1833</td>
        <td>-</td>

        <td>
          <a href="#/people/jacobus-bernardus-van-brussel-1736">
            Jacobus Bernardus van Brussel
          </a>
        </td>
      </tr>

      <tr data-cy="person">
        <td>
          <a className="has-text-danger" href="#/people/lievijne-jans-1542">
            Lievijne Jans
          </a>
        </td>

        <td>f</td>
        <td>1542</td>
        <td>1582</td>
        <td>-</td>
        <td>-</td>
      </tr>

      <tr data-cy="person">
        <td>
          <a href="#/people/bernardus-de-causmaecker-1721">
            Bernardus de Causmaecker
          </a>
        </td>

        <td>m</td>
        <td>1721</td>
        <td>1789</td>

        <td>
          <a className="has-text-danger" href="#/people/livina-haverbeke-1692">
            Livina Haverbeke
          </a>
        </td>

        <td>
          <a href="#/people/lieven-de-causmaecker-1696">
            Lieven de Causmaecker
          </a>
        </td>
      </tr> */}
      </tbody>
    </table>
  );
};
